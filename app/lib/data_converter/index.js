var converter = require('./lib/converter');

var conversions = [
  {
    name: "Categories",
    type: "categories",
    in: require('./data/categories')
  },
  {
    name: "Data Sets",
    type: "datasets",
    in: require('./data/datasets')
  },
  {
    name: "Citi Bike",
    type: "citibike",
    in: require('./data/citibike')
  }
];

converter(conversions);
