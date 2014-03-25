var express = require('express');
var app = express();
var sf = require('sequelize-fixtures');
var models = require('./models');
var _ = require('lodash');
var when = require('when');
var util = require('util');
var inflection = require('inflection');

var data = Array.prototype.concat(
  require('./seed_files/users'),
  require('./seed_files/vendors'),
  require('./seed_files/data_sets'),
  require('./seed_files/data_tags'),
  require('./seed_files/categories'),
  require('./seed_files/data_previews')
);

models.init(app);

sf.loadFixtures(data, app.Models, function(err) {
  setAssociations(data, app.Models)
  .done(function() {
    console.log("DB seeded.");
  });
});

function addAssociation(modelKey, lookupColumn, columnValue, dataSet, models) {
  var matcher = {};
  matcher[lookupColumn] = columnValue;

  return models[modelKey].find({where: matcher})
         .then(function(toAssociate) {
            if (!toAssociate) {throw new Error(key + ' with a '+lookupColumn+' '+columnValue+' not found');}

            return dataSet["add"+modelKey](toAssociate);
         });
}

function addDataSetAssociation(dataSet, seedAttributes, models) {
  if (!dataSet) {throw new Error('DataSet '+ seedAttributes['data']['title'] +' not found');}

  // loop through the associations set on the dataSet
  return when.map(_.keys(seedAttributes['associations']), function(key) {

    // normalize modelKey to be camelCase and singular
    var lookup = inflection.camelize(inflection.singularize(key));
    var lookups = Array.prototype.concat(seedAttributes['associations'][key])

    return when.map(lookups, function(model) {
      var lookupColumn = model.lookupColumn || "name";
      var columns      = Array.prototype.concat(_.isObject(model) ? model.values : model);

      return when.map(columns, function(columnName) {
        return addAssociation(lookup, lookupColumn, columnName, dataSet, models);
      });
    })
  });
};

function setAssociations(data, models) {
  var dataSets = _.where(data, {model: 'DataSet'});

  return when.map(dataSets, function(seedAttributes) {
    return models.DataSet.find({where: {title: seedAttributes['data']['title']}})
      .then(function(dataSet) {
        return addDataSetAssociation(dataSet, seedAttributes, models);
      });
  });
}
