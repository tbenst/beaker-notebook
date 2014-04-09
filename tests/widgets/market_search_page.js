module.exports = function() {
  return this.Widgets.MarketSearchPage = this.Widget.extend({
    root: '.marketplace',
    getTotalResults: function() {
      return this.read(".total-result-count").then(function(v) {
        return +v.match(/[0-9]*/);
      });
    }
  });
};
