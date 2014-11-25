var _ = require('lodash');

module.exports = function(Bookshelf, app) {
  var Publication = Bookshelf.Model.extend({
    tableName: "publications",
    hasTimestamps: true,
    notebook: function() {
      return this.belongsTo(app.Models.Notebook);
    },

    author: function() {
      return this.belongsTo(app.Models.User);
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

  Publication.withAuthor = function(id) {
    return Publication
      .query('where', 'id', '=', id)
      .fetch({withRelated: 'author'})
      .then(function(p) {
        p.relations.author.attributes = _.omit(p.relations.author.attributes, 'password');
        return p;
      });
  };

  return {
    name: "Publication",
    model: Publication
  }
}
