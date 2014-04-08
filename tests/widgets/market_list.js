module.exports = function() {
  return this.Widgets.MarketList = this.Widget.List.extend({
    root: '.market-list',
    itemSelector: 'li'
  });
};
