module.exports = function() {
  return this.Widgets.MarketTextSearch = this.Widget.extend({
    root: '.market-text-search',
    setTerm: function(val) {
      return this.fill('', val);
    }
  });
};
