module.exports = function() {
  var World = this;

  this.Widgets.CategoryField = this.Widget.extend({
    root: '.dataset-category-field'
  });

  this.Widgets.DatasetTags = this.Widget.List.extend({
    root: '.tags',
    itemSelector: '.tag',

    contains: function(text) {
      return this.isVisible({text: text});
    },

    clickTag: function(tag) {
      return this.findWhere(function(item) {
        return item.getText()
        .then(function(text) {
          return text.match(tag);
        });
      })
      .then(function(item) {
        return item.click();
      });
    },
  });
};
