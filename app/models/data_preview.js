module.exports = function(Bookshelf, app) {
  var DataPreview = Bookshelf.Model.extend({
    tableName: "DataPreviews"
  });

  return {
    name: "DataPreview",
    model: DataPreview
  };
}
