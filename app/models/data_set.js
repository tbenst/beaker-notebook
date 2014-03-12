var _ = require('lodash'),
    util = require('util');

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
          as: "Tags",
          through: "DataSetsDataTags",
          foreignKey: 'dataSetId'
        });

        DataSet.hasMany(models.Category, {
          as: 'categories',
          through: 'DataSetsCategories',
          foreignKey: 'dataSetId'
        });
      },

      findByCategory: function(category, options){
        if (!category) {return DataSet.findAll(options);}

        var Category = this.models.Category;

        return Category.findAll({where: ["path <@ ?", category.path]}) // ltree expression to find all categories that belong to a sub-tree which starts in the current category (including it)
          .then(function(categories) {
            var ids = _.map(categories, function(category) {
              return category.id;
            }).join(",");

            var query =
              "SELECT \"DataSets\".*\n" +
              "FROM \"DataSets\"\n" +
              "INNER JOIN \"DataSetsCategories\" ON \"DataSets\".id = \"DataSetsCategories\".\"dataSetId\" AND\n" +
              "\"DataSetsCategories\".\"categoryId\" IN (%s)\n" +
              "LIMIT %d OFFSET %d";

            query = util.format(query, ids, options['limit'], options['offset']);

            return sequelize.query(query, DataSet);
          });
      }
    }
  });

  return DataSet;
};
