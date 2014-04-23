module.exports = function() {
  return this.Widgets.MarketTextSearch = this.Widget.extend({
    root: '.search',
    setTerm: function(val) {
      return this.fill('', val);
    }
  });
};
