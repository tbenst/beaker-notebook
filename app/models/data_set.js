var _         = require('lodash'),
    Bluebird  = require('bluebird'),
    Pipeline  = require('when/pipeline');

var elasticsearch = require('elasticsearch');
var elastic = {
  host: process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR,
  port: process.env.ELASTICSEARCH_PORT_9200_TCP_PORT
};

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

    indexName: function() {
      return 'catalog_' + this.catalogPath();
    },

    catalogPath: function() {
      function catalog(path) {
        var p = path.split('.');
        return p[0] + '.' + p[1];
      }

      if (this.get('categories')) {
        var category = this.get('categories')[0];
        return catalog(category.path);
      } else if (this.related('categories')) {
        var category = this.related('categories').models[0];
        return catalog(category.get('path'));
      }
    },

    fetchFromElastic: function() {
      var _this = this;

      return DataSet.findByIds({ids: [this.id], size: 1})
      .then(function(d) {
        if (d.length < 1) throw new Error('DataSet not found in Elasticsearch');
        var dataset = d[0];
        _this.set(dataset);

        return models.Subscription.query({where: {data_set_id: dataset.id}}).fetchAll()
        .then(function(subscriptions) {
          // inject subscription ids into dataset
          var ids = _.pluck(subscriptions.toJSON(), 'userId');
          return _.extend(dataset, {subscriberIds: ids});
        });
      })
      .then(function(dataset) {
        // inject related datasets
        return DataSet.taggedWith({
          catalogPath: _this.catalogPath(),
          tags: dataset.tags,
          exclude: [_this.id]
        })
        .then(function(related) {
          return _.extend(dataset, {related: related.data});
        })
      })
    },

    elasticJSON: function() {
      return _.extend(this.get("metadata"), {
        id: this.id,
        categories: this.related('categories'),
        dataPreviews: this.related('dataPreviews')
      });
    },

  }, {

    formats: function() {
      return query('data_sets')
        .distinct('format')
        .select()
        .orderBy('format', 'ASC')
    },

    queryBuilder: function(catalog, params) {
      return {
        query: {
          filtered: {
            query: {
              bool: {must: this.mustQueries(catalog.textFields(), params)}
            },
            filter: {
              bool: {
                must: this.mustFilters(catalog.filters(), params),
                must_not: this.mustNotFilters(params)
              }
            }
          }
        },
        sort: [
          {_score: {order: "desc"}},
          {raw_title: {order: "asc"}}
        ],
        aggs: this.aggs(catalog.filters())
      };
    },

    mustFilters: function(fields, params) {
      var _this = this, v;
      var filters = [_this.categoryPathFilter(params.categoryPath || '0')];
      fields.forEach(function(key) {
        if (v = params[key]) {
          if (_.isArray(v)) {
            filters.push(_this.filterTerms(key, v));
          } else {
            filters.push(_this.filterTerm(key, v));
          }
        }
      });
      return filters;
    },

    mustNotFilters: function(params) {
      var not = [];
      if (params.exclude) {
        not.push({
          ids: {
            values: params.exclude
          }
        });
      }
      return not;
    },

    mustQueries: function(fields, params) {
      var _this = this;
      var queries = [];
      QUERY_KEYS.forEach(function(key) {
        if (params[key]) {
          queries.push(_this[key + 'Query'](fields, params[key]));
        }
      });
      if (_.isEmpty(queries)) {
        queries.push({match_all: {}})
      }
      return queries;
    },

    aggsTerm: function(key) {
      return {terms: {field: key}};
    },

    aggs: function(fields) {
      var _this = this;
      var aggs = {}
      fields.forEach(function(key) {
        aggs[key] = _this.aggsTerm(key);
      });
      return aggs;
    },

    searchTermQuery: function(fields, term) {
      return {
        multi_match: {
          query: term,
          fields: fields,
          operator: 'and'
        }
      };
    },

    searchScopeQuery: function(fields, term) {
      return this.searchTermQuery(fields, term);
    },

    // matches multiple values
    filterTerms: function(key, value) {
      var t = {execution: 'and'};
      t[key] = value;
      return {
        terms: t,
      };
    },

    // matches a single value
    filterTerm: function(key, value) {
      var t = {};
      t[key] = value;
      return {term: t};
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

    // transform Elasticsearch results into format expected by front_end
    transformResults: function(catalog, d) {
      var res = {
        data: _.pluck(d.hits.hits, '_source'),
        totalItems: d.hits.total
      };
      res.filters = {}
      catalog.filters().forEach(function(key) {
        res.filters[key] = _.pluck(d.aggregations[key].buckets, 'key');
      });
      return res;
    },

    findMatching: function(params, options) {
      var _this = this;
      var categoryPath = params.categoryPath;
      var catalogPath = categoryPath ? categoryPath.split('.').slice(0,2).join('.') : '0.1';
      var index = params.currentIndex;
      return new app.Models.Category({path: catalogPath, index: index})
      .fetchFromElastic()
      .then(function(catalog) {
        var q = _this.queryBuilder(catalog, params);
        return client.search({
          index: index,
          type: 'datasets',
          size: options.size,
          from: options.from,
          body: q
        })
        .then(function(results) {
          return _this.transformResults(catalog, results);
        })
      })
    },

    numIds: function(s) {
      // ids is a string of numbers seperated by commas
      // to normalize the data we must split on commas and then
      // convert the string numbers to ints
      return _(s.split(",")).map(function(i) {return +i}).value();
    },

    findByIds: function(options) {
      var size = options.size || Number.MAX_SAFE_INTEGER;
      var q = {
        query: {
          ids: {values: options.ids}
        }
      };
      return client.search({
        index: '*',
        type: 'datasets',
        size: options.size,
        body: q
      })
      .then(function(d) {
        return _.pluck(d.hits.hits, '_source')
      });
    },

    taggedWith: function(options) {
      return this.findMatching({
        categoryPath: options.catalogPath,
        tags: options.tags,
        exclude: options.exclude
      }, {
        size: 5,
        from: 0
      });
    }
  });

  return {
    name: "DataSet",
    model: DataSet
  }
};
