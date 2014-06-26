module.exports = function() {
  return this.Widgets.MarketCategory = this.Widget.extend({
    root: '.tree-market-category ul li',

    clickCategory: function(category) {
      return this.find().then(function() {
        return this.driver.executeScript("Sizzle('"+this.root+":contains(\""+category+"\") .tree-label')[0].click()");
      }.bind(this));
    },

    selectedCategoryCount: function() {
      return this.findAll('.tree-selected').then(function(elements) {
        return elements.length;
      });
    }

  });
};
