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

        DataSet.hasMany(models.DataPreview, {
          as: "DataPreviews",
          through: "DataSetsDataPreviews",
          foreignKey: 'dataSetId'
        });

        DataSet.hasMany(models.Category, {
          as: 'categories',
          through: 'DataSetsCategories',
          foreignKey: 'dataSetId'
        });
      },

      findAllSql: function() {
        var query =
          "SELECT \"DataSets\".*\n" +
          "FROM \"DataSets\"\n" +
          "LIMIT :limit OFFSET :offset\n";
        return query;
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
        return this.findMatchingSql(filters, options).then(function(query) {
          return sequelize.query(query, DataSet, {}, options);
        });
      },

      // loops over the filter keys to see if anything was passed via query params
      // if something was loop over the query builders and build N queries.
      getQueries: function(filters) {
        var filterKeys  = ["vendorIDs", "categoryID", "tagIDs", "formats"];

        return W.all(_(filterKeys).map(function(key) {
          if (filters[key]) {
            return this[key+"QueryBuilder"](decodeURIComponent(filters[key]))
          }
        }, this).compact().value());
      },

      formatsQueryBuilder: function(names) {
        names = names.split(",").map(function(v){
          return '\''+v+'\'';
        }).join(',');

        var query =
          "SELECT \"DataSets\".* FROM \"DataSets\" \n"+
          "WHERE \"DataSets\".\"format\" in (%s)";

        return util.format(query, names);
      },

      tagIDsQueryBuilder: function(ids) {
        var query =
          "SELECT \"DataSets\".*\n" +
          "FROM \"DataSets\"\n" +
          "JOIN \"DataSetsDataTags\" on \"DataSets\".\"id\"=\"DataSetsDataTags\".\"dataSetId\" \n"+
          "WHERE \"dataTagId\" IN (%s)";

        return util.format(query, ids);
      },

      vendorIDsQueryBuilder: function(ids) {
        var query =
          "SELECT \"DataSets\".*\n" +
          "FROM \"DataSets\"\n" +
          "WHERE (\"DataSets\".\"vendorId\" IN (%s))";

        return util.format(query, ids);
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
