module.exports = function() {
  return this.Widgets.MarketFilters = this.Widget.extend({
    root: '.marketplace',
    setSearchText: function(val) {
      return this.fill(".market-text-search", val)
    }
  });
};
