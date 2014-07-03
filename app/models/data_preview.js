module.exports = function(Bookshelf, app) {
  var DataPreview = Bookshelf.Model.extend({
    tableName: "DataPreviews",

    idAttrs: ["previewUrl"]
  });

  return {
    name: "DataPreview",
    model: DataPreview
  };
}
