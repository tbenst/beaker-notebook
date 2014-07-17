module.exports = function(Bookshelf, app) {
  var Vendor = Bookshelf.Model.extend({
    tableName: "Vendors",

    idAttrs: ["name"]
  });

  return {
    name: "Vendor",
    model: Vendor
  };
}
