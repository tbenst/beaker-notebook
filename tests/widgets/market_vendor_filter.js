module.exports = function() {
  return this.Widgets.MarketVendorFilter = require("./market_select_filter_base").call(this).extend({
    root: '.filter-vendor',
  });
};
