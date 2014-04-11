module.exports = function() {
  return this.Widgets.MarketItem = this.Widget.extend({
    root: '.marketplace',

    goBackToSearch: function() {
      return this.click(".return-to-market-search")
    }
  });
};
