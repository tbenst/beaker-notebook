module.exports = function() {
  this.Widgets.Publication = this.Widget.extend({
    root: '.publication',

    name: function() {
      return this.read('.name');
    },

    description: function() {
      return this.read('.description');
    }
  });
};
