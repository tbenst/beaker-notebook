_s = require('underscore.string');
var _ = require('lodash');

module.exports = function() {
  return this.Widgets.MarketCategory = this.Widget.List.extend({
    root: '.tree-market-category ul',

    clickCategory: function(category) {
      return this.filter(function(item) {
       return item.read({ transformer: _s.titleize }).then(function(contents) {
          return contents.match(category);
        });
      }).then(function(filtered) {
        return _.last(filtered).click('.tree-label');
      });
    },

    openCatalog: function() {
      return this.click(".tree-branch-head");
    },

    selectedCategoryCount: function() {
      return this.findAll('.tree-selected').then(function(elements) {
        return elements.length();
      });
    },

    categoryCount: function(category) {
      return this.filter(function(item) {
        return item.read({ transformer: _s.titleize }).then(function(categoryContent) {
          return categoryContent.match(category);
        });
      }).then(function(items) {
        return items[1].read('.count');
      });
    }
  });
};
