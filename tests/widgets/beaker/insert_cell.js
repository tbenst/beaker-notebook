module.exports = function() {
  this.Widgets.Beaker = this.Widgets.Beaker || {};

  return this.Widgets.Beaker.InsertCell = this.Widget.extend({
    root: '.insert-cell-indicator'
  });
};
