_s = require('underscore.string');
var _ = require('lodash');

module.exports = function() {
  return this.Widgets.MarketCategory = this.Widget.List.extend({
    root: '.tree-market-category ul',

    clickCategory: function(category) {
      return this.findCategory(category)
      .then(function(node) {
        return node.click('.tree-label');
      });
    },

    findCategory: function(category) {
      return this.filter(function(item) {
       return item.read({ transformer: _s.titleize }).then(function(contents) {
          return contents.match("^"+category);
        });
      }).then(function (results) {
        return results[0];
      })
    },

    openCatalog: function() {
      return this.click(".tree-branch-head");
    },

    selectedCategoryCount: function() {
      return this.findAll('.tree-selected').then(function(elements) {
        return elements.length();
      });
    },

    selected: function() {
      return this.read('.tree-selected item');
    },

    categoryCount: function(category) {
      return this.findCategory(category)
      .then(function(item) {
        return item.read('.count');
      });
    },

    allCategories : function() {
      return this.invoke({method: 'read', arguments: ['.tree-label item']});
    },

    clickCategoryExpand: function (category) {
      return this.findCategory(category)
      .then(function(node) {
        return node.click('.tree-branch-head')
      })
    }
  });
};
