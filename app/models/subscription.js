module.exports = function(Bookshelf, app) {
  var Subscription = Bookshelf.Model.extend({
    tableName: "DataSetsUsers",
    dataSet: function() {
      return this.belongsTo(app.Models.DataSet, 'dataSetId');
    }
  });

  return {
    name: "Subscription",
    model: Subscription
  }
}
