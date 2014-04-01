module.exports = function(Bookshelf, app) {
  var Vendor = Bookshelf.Model.extend({
    tableName: "Vendors"
  });

  return {
    name: "Vendor",
    model: Vendor
  };
}
