var _         = require('lodash'),
    util      = require('util'),
    W         = require('when'),
    Pipeline  = require('when/pipeline');

module.exports = function(sequelize, DataTypes) {
  var DataSet = sequelize.define('DataSet', {
    title: DataTypes.STRING,
    vendor: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    format: DataTypes.STRING,
    rows: DataTypes.BIGINT,
    lastUpdated: DataTypes.DATE,
    vendorId: DataTypes.INTEGER
  }, {
    tableName: 'DataSets',
    classMethods: {
      associate: function(models) {
        DataSet.models = models;

        DataSet.hasOne(models.Vendor, {
          foreignKey: 'vendorId'
        });

        DataSet.hasMany(models.User, {
          through: "DataSetsUsers",
          foreignKey: 'dataSetId'
        });

        DataSet.hasMany(models.DataTag, {
          as: "DataTags",
          through: "DataSetsDataTags",
          foreignKey: 'dataSetId'
        });

        DataSet.hasMany(models.Category, {
          as: 'categories',
          through: 'DataSetsCategories',
          foreignKey: 'dataSetId'
        });
      },

      findMatching: function(filters, options) {
        return this.getQueries(filters).then(function(queries) {
          if (queries.length === 0) {
            return DataSet.findAll(options);
          }

          return sequelize.query(queries.join("\nINTERSECT\n"), DataSet)
        });
      },

      // loops over the filter keys to see if anything was passed via query params
      // if something was loop over the query builders and build N queries.
      getQueries: function(filters) {
        var filterKeys  = ["vendorIDs", "categoryID", "tagIDs"];

        return W.all(_(filterKeys).map(function(key) {
          if (filters[key]) {
            return this[key+"QueryBuilder"](decodeURIComponent(filters[key]))
          }
        }, this).compact().value());
      },

      tagIDsQueryBuilder: function(ids) {
        var d     = W.defer();
        var query =
          "SELECT \"DataSets\".*\n" +
          "FROM \"DataSets\"\n" +
          "JOIN \"DataSetsDataTags\" on \"DataSets\".\"id\"=\"DataSetsDataTags\".\"dataSetId\" \n"+
          "WHERE \"dataTagId\" IN (%s)"
        d.resolve(util.format(query, ids));

        return d.promise;
      },

      vendorIDsQueryBuilder: function(ids) {
        var d     = W.defer();
        var query =
          "SELECT \"DataSets\".*\n" +
          "FROM \"DataSets\"\n" +
          "WHERE (\"DataSets\".\"vendorId\" IN (%s))";

        d.resolve(util.format(query, ids));
        return d.promise;
      },

      categoryIDQueryBuilder: function(id){
        var Category = this.models.Category;

        return Category.find({
          where: {id: id}
        }).then(function(category) {
          return Category.findAll({where: ["path <@ ?", category.path]}) // ltree expression to find all categories that belong to a sub-tree which starts in the current category (including it)
            .then(function(categories) {
              var ids = _.map(categories, function(category) {
                return category.id;
              }).join(",");

              var query =
                "SELECT \"DataSets\".*\n" +
                "FROM \"DataSets\"\n" +
                "INNER JOIN \"DataSetsCategories\" ON \"DataSets\".id = \"DataSetsCategories\".\"dataSetId\" AND\n" +
                "\"DataSetsCategories\".\"categoryId\" IN (%s)\n";

              return util.format(query, ids);
            });
        });
      }
    }
  });

  return DataSet;
};
