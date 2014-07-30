module.exports = function() {
  this.Widgets.Beaker = this.Widgets.Beaker || {};

  return this.Widgets.Beaker.BunsenMenu = this.Widget.List.extend({
    root: '.dropdown.open > .dropdown-menu',

    clickSave: function() {
      return this.at(0).then(function(item) {
        return item.click();
      });
    },

    clickSaveAs: function() {
      return this.at(1).then(function(item) {
        return item.click();
      });
    }
  });
};
