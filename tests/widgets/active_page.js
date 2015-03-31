module.exports = function() {
  return this.Widgets.ActivePage = this.Widget.extend({
    root: '.main-nav-list',
    activeClass: ".nav-item-active",

    isTabActive: function(tabName) {
      return this.find("." + tabName + this.activeClass);
    }
  })
}
