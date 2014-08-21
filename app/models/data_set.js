var _         = require('lodash'),
    Bluebird  = require('bluebird'),
    Pipeline  = require('when/pipeline');

var elasticsearch = require('elasticsearch');
var elastic = {
  host: process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR,
  port: process.env.ELASTICSEARCH_PORT_9200_TCP_PORT
};

var FILTER_KEYS = ['vendorIDs', 'categoryPath', 'tagIDs', 'formats'];
var QUERY_KEYS = ['searchTerm', 'searchScope'];

module.exports = function(Bookshelf, app) {
  var models = app.Models;
  var query = Bookshelf.knex;
  var client = new elasticsearch.Client({
    host: elastic.host + ':' + elastic.port
  });

  var DataSet = Bookshelf.Model.extend({
    tableName: 'data_sets',

    idAttrs: ["title"],

    initialize: function() {
      var _this = this;
      this.on("saved destroyed", this.touchCategories);
      this.on("saved", function() {
        if (process.env["BULK_INDEX"] != 'true') {
          _this.index()
        }
      });
    },

    touchCategories: function() {
      return this.categories().fetch()
        .then(function(categories) {
          return Bluebird.map(categories.models, function(c) {return c.save()});
        });
    },

    vendor: function() {
      return this.belongsTo(models.Vendor)
    },

    users: function() {
      return this.belongsToMany(models.User, 'data_sets_users', 'data_set_id', 'user_id');
    },

    dataPreviews: function() {
      return this.belongsToMany(models.DataPreview, 'data_sets_data_previews', 'data_set_id', 'data_preview_id');
    },

    dataTags: function() {
      return this.belongsToMany(models.DataTag, 'data_sets_data_tags', 'data_set_id', 'data_tag_id');
    },

    categories: function() {
      return this.belongsToMany(models.Category, 'data_sets_categories', 'data_set_id', 'category_id');
    },

    tags: function() {
      return _.invoke(this.related('dataTags').models, "get", "name");
    },

    withRelated: function() {
      var _this = this;
      return DataSet.taggedWith(this.tags(), [this.id])
        .then(function(related){
          _this.attributes.related = related;
          return _this;
        });
    },

    index: function() {
      return this.load(['categories', 'dataPreviews', 'dataTags', 'vendor'])
      .then(function(model) {
        return client.index({
          index: 'bunsen',
          type: 'datasets',
          id: model.id,
          body: model.toJSON()
        })
      })
    }
  }, {

    formats: function() {
      return query('data_sets')
        .distinct('format')
        .select()
        .orderBy('format', 'ASC')
    },

    queryBuilder: function(params) {
      return {
        query: {
          filtered: {
            query: {
              bool: {must: this.mustQueries(params)}
            },
            filter: {
              bool: {must: this.mustFilters(params)}
            }
          }
        },
        aggs: {
          tags: {
            nested: {
              path: 'dataTags'
            },
            aggs: {
              names: {
                terms: {field: 'dataTags.name'},
                 aggs: {
                    ids: {
                      terms: {field: 'dataTags.id'}
                    }
                  }
              }
            }
          },
          vendors: {
            terms: {field: 'vendor.name'},
            aggs: {
              ids: {
                terms: {field: 'vendor.id'}
              }
            }
          },
          formats: {
            terms: {field: 'format'}
          }
        }
      };
    },

    mustFilters: function(params) {
      var _this = this;
      var filters = [];
      FILTER_KEYS.forEach(function(key) {
        if (params[key]) {
          filters.push(_this[key + 'Filter'](decodeURIComponent(params[key])));
        }
      });
      return filters;
    },

    mustQueries: function(params) {
      var _this = this;
      var queries = [];
      QUERY_KEYS.forEach(function(key) {
        if (params[key]) {
          queries.push(_this[key + 'Query'](decodeURIComponent(params[key])));
        }
      });
      if (_.isEmpty(queries)) {
        queries.push({match_all: {}})
      }
      return queries;
    },

    searchTermQuery: function(term) {
      return {
        multi_match: {
          query: term,
          fields: ['title', 'description'],
          operator: 'and'
        }
      };
    },

    searchScopeQuery: function(term) {
      return this.searchTermQuery(term);
    },

    tagIDsFilter: function(ids) {
      return {
        nested: {
          path: 'dataTags',
          filter: {
            bool: {must: [{term: {'dataTags.id': this.numIds(ids)}}]}
          }
        }
      };
    },

    vendorIDsFilter: function(ids) {
      return {term: {'vendor.id': this.numIds(ids)}};
    },

    formatsFilter: function(format) {
      return {term: {format: format}};
    },

    categoryPathFilter: function(path) {
      return {
        bool: {
          should: [
            {term: {'categories.path': path}},
            {prefix: {'categories.path': path + '.'}}
          ]
        }
      };
    },

    transformResults: function(d) {
      return {
        // transform Elasticsearch results into format expected by front_end
        data: _.pluck(d.hits.hits, '_source'),
        totalItems: d.hits.total,
        relatedTags: _.map(d.aggregations.tags.names.buckets, function(t) {
          return {
            name: t.key,
            id: t.ids.buckets[0].key
          }
        }),
        formats: _.pluck(d.aggregations.formats.buckets, 'key'),
        vendors: _.map(d.aggregations.vendors.buckets, function(v) {
          return {
            name: v.key,
            id: v.ids.buckets[0].key
          }
        })
      };
    },

    findMatching: function(filters, options) {
      return client.search({
        type: 'datasets',
        size: options.size,
        from: options.from,
        body: this.queryBuilder(filters)
      })
      .then(this.transformResults.bind(this))
    },

    numIds: function(s) {
      // ids is a string of numbers seperated by commas
      // to normalize the data we must split on commas and then
      // convert the string numbers to ints
      return _(s.split(",")).map(function(i) {return +i}).value();
    },

    taggedWith: function(tags, excludeIds) {
      if (!tags || tags.length == 0) {
        // return no results. workaround for a shortcoming in KNEX.
        // "where in ()" is invalid SQL.
        return query('data_sets').whereNull('id');
      }
      var q = query('data_sets')
        .select('data_sets.*')
        .distinct()
        .limit(5)
        .join('data_sets_data_tags', 'data_sets.id', '=', 'data_sets_data_tags.data_set_id')
        .join('data_tags', 'data_tags.id', '=', 'data_sets_data_tags.data_tag_id')
        .whereIn('data_tags.name', tags)
        .groupBy('data_sets.id')
        .having(query.raw('count(*) = ' + tags.length));
      if (excludeIds && excludeIds.length > 0) {
        q = q.whereNotIn('data_sets.id', excludeIds)
      }
      return q;
    }
  });

  return {
    name: "DataSet",
    model: DataSet
  }
};
