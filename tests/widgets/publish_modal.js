module.exports = function() {
  var World = this;

  this.Widgets.PublishModal = this.Widget.extend({
    root: 'modal',

    addDescription: function(description) {
      return this.fill('.description', description);
    },

    selectCategory: function(category) {
      return this.click('select').then(function() {
        return this.find('select').then(function(select) {
          return new World.Widget({ el: select }).findByText(category)
          .then(function(option) {
            return option.click();
          });
        });
      }.bind(this));
    },

    publish: function() {
      return this.click('.publish');
    }
  });
}
