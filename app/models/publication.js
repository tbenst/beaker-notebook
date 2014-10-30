var _ = require('lodash');

module.exports = function(Bookshelf, app) {
  var Publication = Bookshelf.Model.extend({
    tableName: "publications",

    notebook: function() {
      return this.belongsTo(app.Models.Notebook);
    }
  });

  Publication.languages = function(contents) {
    contents = JSON.parse(contents) || [];

    return _(contents.cells)
      .map('evaluator')
      .compact()
      .uniq()
      .value();
  };

  return {
    name: "Publication",
    model: Publication
  }
}
