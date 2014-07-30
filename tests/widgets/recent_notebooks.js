module.exports = function() {
  return this.Widgets.RecentNotebooks = this.Widget.List.extend({
    root: '.recently-used',
    itemSelector: '.recent-notebook',

    showList: function() {
      // simulate hover
      var method = "Sizzle('"+this.root+" ul')[0].style.display = 'block';";
      return this.driver.executeScript(method).then(
        this.waitForItem.bind(this));
    },

    waitForItem: function() {
      return this.find(this.itemSelector);
    },

    clickItem: function(name) {
      return this.findByText(name).then(function(el){
        return el.click();
      });
    },

    getNames: function() {
      return this.showList().then(function() {
        return $.map(this.items(), function(n) {
          return n.find('a').getInnerHtml();
        });
      }.bind(this));
    }
  });
};

