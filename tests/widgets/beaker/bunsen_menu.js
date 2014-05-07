module.exports = function() {
  this.Widgets.Beaker = this.Widgets.Beaker || {};

  return this.Widgets.Beaker.BunsenMenu = this.Widget.List.extend({
    root: '.dropdown.open > .dropdown-menu',

    clickSave: function() {
      return this.items().then(function(items) {
        return items[0].click();
      });
    },

    clickSaveAs: function() {
      return this.items().then(function(items) {
        return items[1].click();
      });
    }
  });
};
