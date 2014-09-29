module.exports = function() {
  return this.Widgets.MarketFilter = require("./market_select_filter_base").call(this).extend({
    initialize: function(name) {
      this.root = '.filter-' + name;
    }
  });
}
