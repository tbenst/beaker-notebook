var _     = require('lodash'),
    util  = require('util');

module.exports = function(Bookshelf, app) {
  var models = app.Models;
  var query = Bookshelf.knex;

  var OpenNotebook = Bookshelf.Model.extend({
    tableName: "OpenNotebooks"
  });

  return {
    model: OpenNotebook,
    name: "OpenNotebook"
  }
}
