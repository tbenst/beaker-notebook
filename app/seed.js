var express = require('express');
var app = express();
var sf = require('sequelize-fixtures');
var models = require('./models');
var _ = require('lodash');
var when = require('when');
var util = require('util');

var data = Array.prototype.concat(
  require('./seed_files/vendors'),
  require('./seed_files/data_sets'),
  require('./seed_files/data_tags'),
  require('./seed_files/categories')
);

models.init(app);

sf.loadFixtures(data, app.Models, function(err) {
  setUpDataSetsTags(data, app.Models)
  .then(setUpDataSetsCategories(data, app.Models))
    .done(function() {
      console.log("DB seeded.");
    });
});


function setUpDataSetsTags(data, models) {
  var dataSets = _.where(data, {model: 'DataSet'});

  return when.map(dataSets, function(attrs) {
    return models.DataSet.find({where: {title: attrs['data']['title']}}).then(function(dataSet) {
      if (!dataSet) {throw new Error('DataSet not found');}

      return when.map(attrs['associations']['tags'], function(tagName) {
        return models.DataTag.find({where: {name: tagName}}).then(function(tag) {
          if (!tag) {throw new Error('Tag with a name '+tagName+' not found');}
          return dataSet.addTag(tag);
        });
      });

    });
  });
}

function setUpDataSetsCategories(data, models) {
  var dataSets = _.where(data, {model: 'DataSet'});

  return when.map(dataSets, function(attrs) {
    return models.DataSet.find({where: {title: attrs['data']['title']}})
      .then(function(dataSet) {
        if (!dataSet) {throw new Error('DataSet not found');}
        return models.Category.find({where: {name: attrs['associations']['category']}})
        .then(function(category) {
          return dataSet.setCategories([category]);
        });
      });
  });
}
