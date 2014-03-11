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
    last_updated: DataTypes.DATE,
    vendor_id: DataTypes.INTEGER
  }, {
    tableName: 'data_sets',
    classMethods: {
      associate: function(models) {
        DataSet.models = models;

        DataSet.hasOne(models.Vendor, {
          foreignKey: 'vendor_id'
        });

        DataSet.hasMany(models.User, {
          through: "data_sets_Users"
        });

        DataSet.hasMany(models.DataTag, {
          as: "Tags",
          through: "data_sets_data_tags"
        });

        DataSet.hasMany(models.Category, {
          as: 'categories',
          through: 'DataSetsCategories'
        });
      },

      findByCategory: function(category, options){
        if (!category) {return DataSet.findAll(options);}

        var Category = this.models.Category;

        return Category.findAll({where: ["path <@ ?", category.path]}) // ltree expression to find all categories at the level of current category or below
          .then(function(categories) {
            var ids = _.map(categories, function(category) {
              return category.id;
            }).join(",");

            var query =
              "SELECT data_sets.*\n" +
              "FROM data_sets\n" +
              "INNER JOIN \"DataSetsCategories\" ON data_sets.id = \"DataSetsCategories\".\"data_setId\" AND\n" +
              "\"DataSetsCategories\".\"CategoryId\" IN (%s)\n" +
              "LIMIT %d OFFSET %d";

            query = util.format(query, ids, options['limit'], options['offset']);

            return sequelize.query(query, DataSet);
          });
      }
    }
  });

  return DataSet;
};
