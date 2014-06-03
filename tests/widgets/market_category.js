module.exports = function() {
  return this.Widgets.MarketCategory = this.Widget.extend({
    root: '.tree-market-category ul li',

    clickCategory: function(category) {
      var findCategory = "return $('"+this.root+":contains(\""+category+"\")')[0]";
      return this.driver.executeScript(findCategory).then(function(elem) {
        elem.click();
      });
    }

  });
};
