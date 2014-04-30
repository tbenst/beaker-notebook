module.exports = function() {
  return this.Widgets.MarketList = this.Widget.List.extend({
    root: '.market-list',
    itemSelector: 'li',

    contents: function() {
      return $.map(this.items(), function(n) {
        return $.all([n.find(".title"), n.find(".description"), n.find(".formats"), n.find('.vendors')])
        .then(function(arr) {
          return $.all(_.invoke(arr, 'getText'))
          .then(function(text) {
            return {
              title: text[0],
              description: text[1],
              format: text[2],
              vendors: text[3]
            }
          });
        });
      });
    },

    select: function(index) {
      return this.items().then(function(items) {
        return items[0].click("a");
      });
    },

    contains: function(text) {
      return this.findAll(this.itemSelector + ' a.title').then(function(nodes) {
        return $.filter(nodes, function(n) {
          return n.getInnerHtml().then(function(t) {
            return text === t;
          });
        })
        .then(function(filtered) {
          return filtered.length > 0;
        });
      })
    },

    clickItem: function(title) {
      var xpath = "return document.evaluate(\"//a[contains(text(),'" + title + "')]\", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0)";
      return this.driver.executeScript(xpath).then(function(a) {
        return a.click();
      });
    }
  });
};
