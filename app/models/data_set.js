var _         = require('lodash'),
    Bluebird  = require('bluebird'),
    Pipeline  = require('when/pipeline');

module.exports = function(Bookshelf, app) {
  var models = app.Models;
  var query = Bookshelf.knex;

  var DataSet = Bookshelf.Model.extend({
    tableName: 'DataSets',

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
      return this.hasOne(model.Vendor, 'vendorId')
    },

    users: function() {
      return this.belongsToMany(models.User, 'DataSetsUsers', 'dataSetId', 'userId');
    },

    dataPreviews: function() {
      return this.belongsToMany(models.DataPreview, 'DataSetsDataPreviews', 'dataSetId', 'dataPreviewId');
    },

    dataTags: function() {
      return this.belongsToMany(models.DataTag, 'DataSetsDataTags', 'dataSetId', 'dataTagId');
    },

    categories: function() {
      return this.belongsToMany(models.Category, 'DataSetsCategories', 'dataSetId', 'categoryId');
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
      return query('DataSets')
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
          .select('DataTags.*')
          .count('DataTags.id AS tagCount')
          .from(query.raw('(' + sql + ') AS matching'))
          .join('DataSetsDataTags', 'matching.id', '=', 'DataSetsDataTags.dataSetId')
          .join('DataTags', 'DataTags.id', '=', 'DataSetsDataTags.dataTagId')
          .groupBy('DataTags.id')
          .orderBy('tagCount', 'DESC');
      });
    },

    // loops over the filter keys to see if anything was passed via query params
    // if something was loop over the query builders and construct combined sql
    getQuerySql: function(filters) {
      var filterKeys  = ["vendorIDs", "categoryID", "tagIDs", "formats", "searchTerm", "searchScope"];

      var q = query('DataSets').select('DataSets.*');
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
        .join('DataSetsDataTags', 'DataSets.id', '=', 'DataSetsDataTags.dataSetId')
        .whereIn('dataTagId', this.numIds(ids));
    },

    vendorIDsQueryBuilder: function(q, ids) {
      return q.whereIn('vendorId', this.numIds(ids));
    },

    searchScopeQueryBuilder: function(q, term) {
      return this.searchTermQueryBuilder(q, term);
    },

    searchTermQueryBuilder: function(q, term) {
      // note: this subquery is necessary rather than a regular join (even if the two are logically
      // equivalent) because postgres query planner will not use full text indices for queries
      // across multiple tables.
      return q.join(query.raw('(select "Vendors".* from "Vendors" where "Vendors".name ilike \'%' +
                              term.replace(/'/g, "''") +  // don't allow param to close quote
                              '%\') as v'),  'v.id', '=', 'DataSets.vendorId', 'left')
        .where(function() {
            this.where('title', 'ILIKE', '%' + term + '%')
            .orWhere('DataSets.description', 'ILIKE', '%' + term + '%')
        });
    },

    categoryIDQueryBuilder: function(q, id){
      return q.join('DataSetsCategories', 'DataSets.id', '=', 'DataSetsCategories.dataSetId').
        join('Categories', 'Categories.id', '=', 'DataSetsCategories.categoryId').
        whereRaw('path <@ (select path from "Categories" where id = ?)', [id]);
    },

    taggedWith: function(tags, excludeIds) {
      if (!tags || tags.length == 0) {
        // return no results. workaround for a shortcoming in KNEX.
        // "where in ()" is invalid SQL.
        return q('DataSets').whereNull('id');
      }
      var q = query('DataSets')
        .select('DataSets.*')
        .distinct()
        .limit(5)
        .join('DataSetsDataTags', 'DataSets.id', '=', 'DataSetsDataTags.dataSetId')
        .join('DataTags', 'DataTags.id', '=', 'DataSetsDataTags.dataTagId')
        .whereIn('DataTags.name', tags)
        .groupBy('DataSets.id')
        .having(query.raw('count(*) = ' + tags.length));
      if (excludeIds && excludeIds.length > 0) {
        q = q.whereNotIn('DataSets.id', excludeIds)
      }
      return q;
    }
  });

  return {
    name: "DataSet",
    model: DataSet
  }
};
