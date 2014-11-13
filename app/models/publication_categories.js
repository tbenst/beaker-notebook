module.exports = function(Bookshelf, app) {
  var PublicationCategory = Bookshelf.Model.extend({
    tableName: 'publication_categories',

    publications: function() {
      return this.hasMany(app.Models.PublicationCategory);
    }
  });

  PublicationCategory.fetchAllWithCount = function() {
    var publicationsTable = app.Models.Publication.__super__.tableName;
    var publicationCategoryTable = app.Models.PublicationCategory.__super__.tableName;

    return Bookshelf.knex.raw('SELECT p.*, COALESCE(t1.p_count,0) AS count ' +
                              'FROM ' + publicationCategoryTable + ' p ' +
                              'LEFT JOIN (SELECT category_id, COUNT(*) p_count ' +
                              'FROM ' + publicationsTable + ' GROUP BY category_id) t1 ' +
                              'ON t1.category_id = p.id'
                             );
  };

  return {
    model: PublicationCategory,
    name: "PublicationCategory"
  }
};
