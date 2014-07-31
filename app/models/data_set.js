var _         = require('lodash'),
    Bluebird  = require('bluebird'),
    Pipeline  = require('when/pipeline');

module.exports = function(Bookshelf, app) {
  var models = app.Models;
  var query = Bookshelf.knex;

  var DataSet = Bookshelf.Model.extend({
    tableName: 'data_sets',

    idAttrs: ["title"],

    initialize: function() {
      this.on("saved destroyed", this.touchCategories);
    },

    touchCategories: function() {
      return this.categories().fetch()
        .then(function(categories) {
          return Bluebird.map(categories.models, function(c) {return c.save()});
        });
    },

    vendor: function() {
      return this.hasOne(model.Vendor)
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
    }
  }, {

    formats: function() {
      return query('data_sets')
        .distinct('format')
        .select()
        .orderBy('format', 'ASC')
    },

    findMatching: function(filters, options) {
      return this.getQuerySql(filters).then(function(sql) {
        return query().select()
          .from(query.raw('(' + sql + ') AS matching'))
          .limit(options['limit'])
          .offset(options['offset']);
      }).then(function(models) {
        return models.map(function(attr) {
          return new DataSet(attr, {parse: true});
        })
      })
    },

    findMatchingCount: function(filters) {
      return this.getQuerySql(filters).then(function(sql) {
        return query()
          .count('matching.id AS matchingCount')
          .from(query.raw('(' + sql + ') AS matching'));
      });
    },

    findMatchingTags: function(filters) {
      return this.getQuerySql(filters).then(function(sql) {
        return query()
          .select('data_tags.*')
          .count('data_tags.id AS tagCount')
          .from(query.raw('(' + sql + ') AS matching'))
          .join('data_sets_data_tags', 'matching.id', '=', 'data_sets_data_tags.data_set_id')
          .join('data_tags', 'data_tags.id', '=', 'data_sets_data_tags.data_tag_id')
          .groupBy('data_tags.id')
          .orderBy('tagCount', 'DESC');
      });
    },

    findMatchingFormats: function(filters) {
      return this.getQuerySql(filters).then(function(sql) {
        return query()
          .select('format')
          .distinct()
          .from(query.raw('(' + sql + ') AS matching'))
          .orderBy('format', 'ASC');
      });
    },

    findMatchingVendors: function(filters) {
      return this.getQuerySql(filters).then(function(sql) {
        return query()
          .select('vendors.*')
          .distinct('vendors.name')
          .from(query.raw('(' + sql + ') AS matching'))
          .join('vendors', 'matching.vendor_id', '=', 'vendors.id')
          .orderBy('vendors.name', 'ASC');
      });
    },

    // loops over the filter keys to see if anything was passed via query params
    // if something was loop over the query builders and construct combined sql
    getQuerySql: function(filters) {
      var filterKeys  = ["vendorIDs", "categoryID", "tagIDs", "formats", "searchTerm", "searchScope"];

      var q = query('data_sets')
        .select('data_sets.*')
        .orderBy('data_sets.title', 'ASC');

      return Bluebird.each(filterKeys, function(key) {
        if (filters[key]) {
          q = this[key+"QueryBuilder"](q, decodeURIComponent(filters[key]));
        }
      }.bind(this)).then(function() {
        return q.toString();
      });;
    },

    formatsQueryBuilder: function(q, names) {
      return q.whereIn('format', names.split(","));
    },

    numIds: function(s) {
      // ids is a string of numbers seperated by commas
      // to normalize the data we must split on commas and then
      // convert the string numbers to ints
      return _(s.split(",")).map(function(i) {return +i}).value();
    },

    tagIDsQueryBuilder: function(q, ids) {
      return q.distinct()
        .join('data_sets_data_tags', 'data_sets.id', '=', 'data_sets_data_tags.data_set_id')
        .whereIn('data_tag_id', this.numIds(ids))
        .groupBy('data_sets.id')
        .having(query.raw('count(*) = ' + this.numIds(ids).length));
    },

    vendorIDsQueryBuilder: function(q, ids) {
      return q.whereIn('vendor_id', this.numIds(ids));
    },

    searchScopeQueryBuilder: function(q, term) {
      return this.searchTermQueryBuilder(q, term, 'scope');
    },

    searchTermQueryBuilder: function(q, term, joinName) {
      // note: this subquery is necessary rather than a regular join (even if the two are logically
      // equivalent) because postgres query planner will not use full text indices for queries
      // across multiple tables.

      joinName = joinName || 'term';

      return q.join(query.raw('(select "vendors".* from "vendors" where "vendors".name ilike \'%' +
                              term.replace(/'/g, "''") +  // don't allow param to close quote
                              '%\') as ' + joinName), joinName + '.id', '=', 'data_sets.vendor_id', 'left')
        .where(function() {
            this.where('title', 'ILIKE', '%' + term + '%')
            .orWhere('data_sets.description', 'ILIKE', '%' + term + '%')
        });
    },

    categoryIDQueryBuilder: function(q, id){
      return q.join('data_sets_categories', 'data_sets.id', '=', 'data_sets_categories.data_set_id').
        join('categories', 'categories.id', '=', 'data_sets_categories.category_id').
        whereRaw('path <@ (select path from "categories" where id = ?)', [id]);
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
