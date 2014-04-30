module.exports = function() {
  return this.Widgets.MarketRelatedTags = this.Widget.List.extend({
    root: '.related-tags',
    itemSelector: '.related-tag',

    is: function(tags) {

      return $.map(this.items(), function(n) {
        return n.find('.tag-name').getInnerHtml();
      }).then(function(listedTags) {
        return tags.sort().should.eql(listedTags.sort());
      });
    }
  });
};
