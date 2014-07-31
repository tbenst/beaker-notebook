module.exports = function(Bookshelf, app) {
  var Publication = Bookshelf.Model.extend({
    tableName: "publications",

    notebook: function() {
      return this.belongsTo(app.Models.Notebook);
    }
  });

  return {
    name: "Publication",
    model: Publication
  }
}
