_s = require('underscore.string');
var _ = require('lodash');

module.exports = function() {
  var World = this;

  return this.Widgets.MarketCategory = this.Widget.List.extend({
    root: '.tree-market-category ul',

    clickCategory: function(category) {
      return World.driver.wait(function() {
        return this.findCategory(category)
        .then(function(v) {
          return v != undefined
        })
        .thenCatch(function() {
          return false
        })
      }.bind(this), global.timeout)
      .then(function() {
        return this.findCategory(category)
        .then(function(node) {
          return node.click('.tree-label');
        });
      }.bind(this));
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
      return this.driver.wait(function() {
        return this.findCategory(category)
        .then(function(node) {
          return node != undefined
        })
        .thenCatch(function() {
          return false;
        })
      }.bind(this),
        global.timeout,
        "unable to find category " + category
      )
      .then(function() {
        return this.findCategory(category);
      }.bind(this))
      .then(function(node) {
        return node.click('.tree-branch-head')
      });
    }
  });
};
