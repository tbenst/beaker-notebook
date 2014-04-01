var _         = require('lodash'),
    util      = require('util'),
    W         = require('when'),
    Pipeline  = require('when/pipeline');

module.exports = function(Bookshelf, app) {
  var models = app.Models;
  var query = Bookshelf.knex;

  var DataSet = Bookshelf.Model.extend({
    tableName: 'DataSets',

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
    }
  }, {

    formats: function() {
      return query('DataSets')
        .distinct('format')
        .select()
        .orderBy('format', 'ASC')
    },

    findAllSql: function() {
      return query('DataSets').select().toString();
    },

    findMatchingSql: function(filters) {
      return this.getQueries(filters).then(function(queries) {
        if (queries.length === 0) {
          return DataSet.findAllSql();
        }

        return queries.join("\nINTERSECT\n");
      });
    },

    findMatching: function(filters, options) {
      return this.findMatchingSql(filters).then(function(sql) {
        return query().select()
          .from(query.raw('(' + sql + ') AS matching'))
          .limit(options['limit'])
          .offset(options['offset']);
      })
    },

    findMatchingCount: function(filters) {
      return this.findMatchingSql(filters).then(function(sql) {
        return query()
          .count('matching.id AS matchingCount')
          .from(query.raw('(' + sql + ') AS matching'));
      });
    },

    findMatchingTags: function(filters) {
      return this.findMatchingSql(filters).then(function(sql) {
        return query()
          .select('DataTags.*')
          .count('DataTags.id AS tagCount')
          .from(query.raw('(' + sql + ') AS matching'))
          .join('DataSetsDataTags', 'matching.id', '=', 'DataSetsDataTags.dataSetId')
          .join('DataTags', 'DataTags.id', '=', 'DataSetsDataTags.dataTagId')
          .groupBy('DataTags.id')
          .orderBy('tagCount', 'DESC')
          .limit(10).debug();
      });
    },

    // loops over the filter keys to see if anything was passed via query params
    // if something was loop over the query builders and build N queries.
    getQueries: function(filters) {
      var filterKeys  = ["vendorIDs", "categoryID", "tagIDs", "formats"];

      return W.all(_(filterKeys).map(function(key) {
        if (filters[key]) {
          return this[key+"QueryBuilder"](decodeURIComponent(filters[key]));
        }
      }, this).compact().value());
    },

    formatsQueryBuilder: function(names) {
      return query('DataSets').select('DataSets.*')
        .whereIn('format', names.split(",")).toString();
    },

    tagIDsQueryBuilder: function(ids) {
      var numIds = _(ids).map(function(i) {return +i}).compact().value();
      return query('DataSets').select('DataSets.*')
        .join('DataSetsDataTags', 'DataSets.id', '=', 'DataSetsDataTags.dataSetId')
        .whereIn('dataTagId', numIds).toString();
    },

    vendorIDsQueryBuilder: function(ids) {
      var numIds = _(ids).map(function(i) {return +i}).compact().value();
      return query('DataSets').select('DataSets.*')
        .whereIn('vendorId', numIds).toString();
    },

    categoryIDQueryBuilder: function(id){
      var Category = models.Category;

      return new Category({id: id}).fetch()
        .then(function(category) {
          return Category.collection()
            .query('whereRaw', "path <@ '" + category.get('path') + "'") // ltree expression to find all categories that belong to a sub-tree which starts in the current category (including it)
            .fetch()
            .then(function(fetched) {
              var ids = _.map(fetched.models, function(c) {return c.id});
              return query('DataSets').select('DataSets.*')
                .join('DataSetsCategories', 'DataSets.id', '=', 'DataSetsCategories.dataSetId')
                .whereIn('categoryId', ids).toString();
          });
      });
    }
  });

  return {
    name: "DataSet",
    model: DataSet
  }
};
