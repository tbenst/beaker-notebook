module.exports = function() {
  return this.Widgets.RelatedItems = this.Widget.List.extend({
    root: '.related-items',
    itemSelector: 'li a',

    itemTitle: function(index) {
      return this.readAt(index);
    },

    clickItem: function(title) {
      return this.click({ text: title });
    }
  });
};
