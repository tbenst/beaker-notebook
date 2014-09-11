module.exports = function() {
  return this.Widgets.MarketTextSearch = this.Widget.extend({
    root: '.market-text-search',

    clearSearch: function() {
      return this.clear();
    },

    setTerm: function(val) {
      return this.fill(val);
    }
  });
};
