module.exports = function() {
  return this.Widgets.MarketSearchPage = this.Widget.extend({
    root: '.marketplace',
    getTotalResults: function() {
      return this.read({ selector: ".total-result-count", transformer: function(v) {
        return +v.match(/[0-9]*/);
      }});
    }
  });
};
