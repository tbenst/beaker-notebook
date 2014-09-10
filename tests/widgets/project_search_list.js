var $ = require('selenium-webdriver').promise;
var _ = require('lodash');

module.exports = function() {
  return this.Widgets.ProjectSearchList = this.Widget.List.extend({
    root: '.search-results',
    itemSelector: ".bunsen-list-item",

    click: function(index) {
      return this.clickAt(index);
    },

    contents: function() {
      return this.map(function(n) {
        return $.all([n.read(".title"), n.read(".attributes .count")])
        .then(function(attrs) {
          return {
            name: attrs[0],
            notebooks: attrs[1]
          }
        });
      });
    },

    notebookContents: function() {
      return this.invoke({ method: 'read', arguments: ['.title'] });
    },
  });
}
