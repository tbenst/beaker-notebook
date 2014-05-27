module.exports = function() {
  return this.Widgets.MarketTagFilter = require("./market_select_filter_base").call(this).extend({
    root: '.filter-tags',
  });
};
