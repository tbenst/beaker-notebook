module.exports = function(Bookshelf, app) {
  var Subscription = Bookshelf.Model.extend({
    tableName: "data_sets_users",
    hasTimestamps: true,

    dataSet: function() {
      return this.belongsTo(app.Models.DataSet);
    }
  });

  return {
    name: "Subscription",
    model: Subscription
  }
}
