module.exports = function(Bookshelf, app) {
  var Vendor = Bookshelf.Model.extend({
    tableName: "vendors",
    hasTimestamps: true,
    idAttrs: ["name"]
  });

  return {
    name: "Vendor",
    model: Vendor
  };
}
