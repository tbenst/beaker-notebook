var fs      = require('fs');
var Convert = require('./convert');
var Catalog = require('./catalog');

module.exports = function(conversions) {
  conversions.forEach(function(conversion) {
    console.log(conversion.name + " started.");

    if (!fs.existsSync('converted')) {
      fs.mkdirSync('converted');
    }

    Catalog(Convert[conversion.type](conversion.in), conversion);
    console.log(conversion.name + " finished.\n");
  });
};
