module.exports = function() {
  this.Widgets.PublishModal = this.Widget.extend({
    root: 'modal',

    addDescription: function(description) {
      return this.fill('.description', description);
    },

    publish: function() {
      return this.click('.publish');
    }
  });
}
