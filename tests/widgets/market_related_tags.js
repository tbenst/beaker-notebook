module.exports = function() {
  return this.Widgets.MarketRelatedTags = this.Widget.List.extend({
    root: '.related-tags',
    itemSelector: '.related-tag',

    is: function(tags) {
      return this.invoke({ method: 'read', arguments: ['.tag-name'] }).then(function(listedTags) {
        return tags.sort().should.eql(listedTags.sort());
      });
    }
  });
};
