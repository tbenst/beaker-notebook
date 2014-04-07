module.exports = function(Bookshelf, app) {
  var Subscription = Bookshelf.Model.extend({
    tableName: "DataSetsUsers"
  });

  return {
    name: "Subscription",
    model: Subscription
  }
}
