module.exports = function() {
  var World = this;

  this.Widgets.PublishModal = this.Widget.extend({
    root: 'modal',

    addDescription: function(description) {
      return this.fill({ selector: '.description', value: description });
    },

    selectCategory: function(category) {
      return new World.Widget.Form({ root: this.root })
      .select({ text: category });
    },

    publish: function() {
      return this.click('.publish');
    }
  });
}
