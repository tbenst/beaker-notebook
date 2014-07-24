module.exports = function(Bookshelf, app) {
  var Publication = Bookshelf.Model.extend({
    tableName: "publications",

    notebook: function() {
      return this.belongsTo(app.Models.Notebook, 'notebook_id');
    }
  });

  return {
    name: "Publication",
    model: Publication
  }
}
