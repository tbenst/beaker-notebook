var _  = require('lodash');
var up = require('./level_up');

module.exports = {
  baseConversion: function(data, i) {
    data[i].id = i; // Set id
    up(data[i], 'data'); // Move data up to top level
  },

  remove: {
    postgresData: function(data, i) {
      delete data[i].model;
      delete data[i].associations;
    },
    metadata: function(data, i) {
      delete data[i].metadata;
    },
    models: function(data, i, models) {
      var match = false;
      for(var k = 0; k < models.length; k++) {
        if(data[i].model == models[k]) {
          match = true;
        }
      }
      return match;
    }
  },

  extract: {
    dataPreviews: function(data, i) {
      if(data[i].associations) {
        for(var j = 0; j < data[i].associations.length; j++) {
          if(_.has(data[i].associations[j].lookup, 'DataPreview')) {
            data[i].dataPreviews = data[i].associations[j].lookup.DataPreview;
          }
        }
      }
    },

    category: function(data, i, categories) {
      if(data[i].associations) {
        for(var j = 0; j < data[i].associations.length; j++) {
          // Set category
          if(_.has(data[i].associations[j].lookup, 'Category')) {
            var category = _.where(categories, {
              'name': data[i].associations[j].lookup.Category.name
            });
            data[i].categoryIds = [category[0].id];
            data[i].path = category[0].path;
          }
        }
      }
    },

    metadata: function(data, i) {
      var metadata = data[i].metadata;
      for(var j = 0; j < Object.keys(metadata).length; j++) {
        data[i].vendor = metadata.vendor;
        data[i].tags   = metadata.tags;
      }
    }
  }
};
