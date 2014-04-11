module.exports = function() {
  return this.Widgets.MarketList = this.Widget.List.extend({
    root: '.market-list',
    itemSelector: 'li',
    select: function(index) {
      return this.items().then(function(items) {
        return items[0].click("a");
      });
    }
  });
};
