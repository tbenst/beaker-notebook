var _ = require('lodash');
var Modify = require('./modify');

module.exports = {
  categories: function(data) {
    for(var i = 0; i < data.length; i++) {
      Modify.baseConversion(data, i);
      Modify.remove.postgresData(data, i);
    }

    return data;
  },

  datasets: function(data) {
    var categories = require('../converted/categories');
    for(var i = 0; i < data.length; i++) {
      Modify.baseConversion(data, i);
      Modify.extract.dataPreviews(data, i);
      Modify.extract.category(data, i, categories);
      Modify.extract.metadata(data, i);
      Modify.remove.postgresData(data, i);
      Modify.remove.metadata(data, i);
    }

    return data;
  },

  citibike: function(data) {
    var categories = require('../converted/categories');
    for(var i = 0; i < data.length; i++) {
      Modify.baseConversion(data, i);
      if (Modify.remove.models(data, i, ['Category', 'DataTag', 'Vendor'])) {
        delete data[i];
        continue;
      }
      Modify.extract.category(data, i, categories);
      Modify.remove.postgresData(data, i);
      Modify.remove.metadata(data, i);
    }

    return data;
  }
};
