var fs = require('fs');
var _ = require('lodash');
var categories;

module.exports = function(data, conversion) {
  if(conversion.type == "categories") {
    categories = sortCategories(data, conversion.type);
  } else {
    sortDatasets(data, categories, conversion.type);
  }
};

function sortCategories(data, type) {
  var categories = [];

  writeRawCatalog(data, type);

  for(var i = 0; i < data.length; i++ ) {
    if(_.has(data[i], 'metadata')) {
      categories.push({
        path: data[i].path,
        items: [data[i]]
      });
    } else {
      var basePath = generateBasePath(data[i].path);
      for(var j = 0; j < categories.length; j++) {
        if(categories[j].path.indexOf(basePath) !== -1) {
          categories[j].items.push(data[i]);
        }
      }
    }
  }

  categories.forEach(function(category) {
    writeSortedCatalog(category, type);
  });

  return categories;
}

function sortDatasets(data, categories, type) {
  var datasets = [];
  data = data.filter(function(val) { return val !== null; });

  writeRawCatalog(data, type);

  for(var i = 0; i < categories.length; i++) {
    datasets.push({
      path: categories[i].path,
      items: []
    });

    var basePath = generateBasePath(categories[i].path);
    for(var j = 0; j < data.length; j++) {
      if(data[j].path.indexOf(basePath) !== -1)
        datasets[i].items.push(data[j]);
    }
  }

  datasets.forEach(function(dataset) {
    writeSortedCatalog(dataset, type);
  });
}

function writeRawCatalog(data, type) {
  console.log('  ..creating ' + type + '.json');
  fs.writeFileSync('converted/' + type + '.json', JSON.stringify(data, null, 2));
}

function writeSortedCatalog(catalog, type) {
  var fileName = 'converted/' + type + '_' + catalog.path + '.json';
  console.log('  ..creating ' + fileName);
  fs.writeFileSync(fileName, JSON.stringify(catalog.items, null, 2));
}

function generateBasePath(path) {
  return path.substring(0, 3);
}
