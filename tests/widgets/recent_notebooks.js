module.exports = function() {
  this.Widgets.RecentNotebooks = this.Widget.List.extend({
    root: '.recently-used',
    itemSelector: '.recent-notebook',

    showList: function() {
      return this.hover();
    },

    clickItem: function(name, retry) {
      var _this = this;
      retry = retry || 0;

      return this.find({text: name})
      .then(function(filtered) {
        return _this.driver.executeScript("arguments[0].scrollIntoView(true);", filtered)
        .then(function() {
          return filtered.click();
        })
      })
      .thenCatch(function(err) {
        var _this = this;
        if (retry == 3) { throw err }

        return this.driver.sleep(1000)
        .then(function() {
          return _this.showList();
        })
        .then(function() {
          return _this.clickItem(name, ++retry);
        });
      }.bind(this))
    },

    getNames: function() {
      return this.showList().then(function() {
        return this.invoke({ method: 'read', arguments: ['a'] });
      }.bind(this));
    }
  });
};
