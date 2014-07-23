module.exports = function(Bookshelf, app) {
  var Subscription = Bookshelf.Model.extend({
    tableName: "data_sets_users",
    dataSet: function() {
      return this.belongsTo(app.Models.DataSet, 'dataSetId');
    }
  });

  return {
    name: "Subscription",
    model: Subscription
  }
}
