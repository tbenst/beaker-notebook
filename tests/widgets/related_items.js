module.exports = function() {
  return this.Widgets.RelatedItems = this.Widget.List.extend({
    root: '.related-items',
    itemSelector: 'li a',

    itemTitle: function(index) {
      return this.readAt(index);
    },

    clickItem: function(title) {
      var _this = this;

      return this.find({text: title})
      .then(function(filtered) {
        return _this.driver.executeScript("arguments[0].scrollIntoView(true);", filtered)
        .then(function() {
          return filtered.click();
        })
      });
    }
  });
};
