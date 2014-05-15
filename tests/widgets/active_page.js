module.exports = function() {
  return this.Widgets.ActivePage = this.Widget.extend({
    root: '.main-nav-list',
    activeClass: ".nav-item-active",
    isProjectActive: function() {
      return this.find(".projects"+this.activeClass);
    },
    isMarketPlaceActive: function() {
      return this.find(".market-place"+this.activeClass);
    }
  })
}
