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
      return this.filter(function(n) {
        return n.read('a').then(function(t) {
          return t.search(name) != -1;
        });
      }).then(function(filtered) {
        return filtered[0].click();
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

