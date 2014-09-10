var $ = require('selenium-webdriver').promise;

module.exports = function() {
  this.Widgets.MarketList = this.Widget.List.extend({
    root: '.market-list',
    itemSelector: '.bunsen-list-item',

    contents: function() {
      return this.map(function(n) {
        return $.all([n.read(".title"), n.read(".description"), n.read(".format"), n.read('.vendors')])
        .then(function(attrs) {
          return {
            title: attrs[0].toLowerCase(),
            description: attrs[1].toLowerCase(),
            format: attrs[2].toLowerCase(),
            vendors: attrs[3].toLowerCase()
          }
        });
      });
    },

    select: function(index) {
      return this.at(index).then(function(item) {
        return item.click("a");
      });
    },

    contains: function(text) {
      return this.isVisible({ text: text });
    },

    clickItem: function(title) {
      return this.click({ text: title });
    }
  });

  this.Widgets.MarketSidebar = this.Widget.extend({
    root: '.marketplace .sidebar-left',

    search: function(text) {
      return this.fill({ selector: '.search', value: text });
    }
  });
};
