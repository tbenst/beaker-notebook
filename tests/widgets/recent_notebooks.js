module.exports = function() {
  return this.Widgets.RecentNotebooks = this.Widget.List.extend({
    root: '.recently-used',
    itemSelector: '.recent-notebook',

    showList: function() {
      return this.hover();
    },

    clickItem: function(name) {
      var _this = this;

      return this.find({text: name})
      .then(function(filtered) {
        return _this.driver.executeScript("arguments[0].scrollIntoView(true);", filtered)
        .then(function() {
          return filtered.click();
        })
      });
    },

    getNames: function() {
      return this.showList().then(function() {
        return this.invoke({ method: 'read', arguments: ['a'] });
      }.bind(this));
    }
  });
};
