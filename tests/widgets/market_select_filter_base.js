var $         = require('selenium-webdriver').promise;

module.exports = function() {
  var World = this;

  return this.Widgets.MarketSelectFilterBase = this.Widget.extend({
    showDropdown: function() {
      return this.waitForTag()
      .then(this.hover.bind(this));
    },

    waitForTag: function() {
      return this.find('ul li');
    },

    selectMatching: function(tags) {
      var _this = this;

      return this.showDropdown().then(function() {
        return $.map(tags, function(tag) {
          return _this.click({ text: tag });
        });
      });
    },

    getSelected: function() {
      return this.getItemNames('a.selected');
    },

    getItemNames: function(selector) {
      selector = selector || 'a';
      return this.hover().then(function(items) {
        return items.findAll(selector).then(function(list) {
          return list.invoke('read');
        });
      });
    },
  });
}
