module.exports = function() {
  return this.Widgets.MarketFormatFilter = require("./market_select_filter_base").call(this).extend({
    root: '.filter-format',
  });
}
