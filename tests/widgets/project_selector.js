var $ = require('selenium-webdriver').promise;

module.exports = function() {
  return this.Widgets.ProjectSelector = this.Widget.List.extend({
    root: '.project-selector',
    itemSelector: 'li',

    clickByName: function(name) {
      return this.click({ text: name });
    },

    getNames: function() {
      return this.invoke({ method: 'read', arguments: ['a'] });
    }
  });
};

