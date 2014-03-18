var express = require('express');
var app = express();
var sf = require('sequelize-fixtures');
var models = require('./models');
var _ = require('lodash');
var when = require('when');
var util = require('util');
var inflection = require('inflection');

var data = Array.prototype.concat(
  require('./seed_files/vendors'),
  require('./seed_files/data_sets'),
  require('./seed_files/data_tags'),
  require('./seed_files/categories')
);

models.init(app);

sf.loadFixtures(data, app.Models, function(err) {
  setAssociations(data, app.Models)
  .done(function() {
    console.log("DB seeded.");
  });
});

function addAssociation(modelKey, modelName, dataSet, models) {
  return models[modelKey].find({where: {name: modelName}})
         .then(function(toAssociate) {
            if (!toAssociate) {throw new Error(key + ' with a name '+modelName+' not found');}

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

    return when.map(lookups, function(modelName) {
      return addAssociation(lookup, modelName, dataSet, models);
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
