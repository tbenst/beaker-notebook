module.exports = function() {
  this.Widgets.Beaker = this.Widgets.Beaker || {};

  return this.Widgets.Beaker.BunsenButton = this.Widget.extend({
    root: '#drop2'
  });
};
