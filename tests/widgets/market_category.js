_s = require('underscore.string');

module.exports = function() {
  return this.Widgets.MarketCategory = this.Widget.List.extend({
    root: '.tree-market-category ul',

    clickCategory: function(category) {
      return this.filter(function(item) {
       return item.read({ transformer: _s.titleize }).then(function(contents) {
          return contents.match(category);
        });
      }).then(function(filtered) {
        return filtered[0].click('.tree-label');
      });
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
        return items[0].read('.count');
      });
    }
  });
};
