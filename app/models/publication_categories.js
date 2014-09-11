module.exports = function(Bookshelf, app) {
  var PublicationCategory = Bookshelf.Model.extend({
    tableName: 'publication_categories',

    publications: function() {
      return this.hasMany(app.Models.PublicationCategory);
    }
  });

  return {
    model: PublicationCategory,
    name: "PublicationCategory"
  }
};
