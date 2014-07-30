module.exports = function() {
  return this.Widgets.MarketCategoryHero = this.Widget.extend({
    root: '.category-hero',

    description: function() {
      return this.read('.description');
    },

    owner: function() {
      return this.read('.owner');
    },
  });
};
