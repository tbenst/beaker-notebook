module.exports = function(Bookshelf, app) {
  var DataPreview = Bookshelf.Model.extend({
    tableName: "data_previews",
    hasTimestamps: true,
    idAttrs: ["previewUrl"]
  });

  return {
    name: "DataPreview",
    model: DataPreview
  };
}
