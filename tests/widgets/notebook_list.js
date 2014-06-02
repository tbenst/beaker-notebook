module.exports = function() {
  return this.Widgets.NotebookList = this.Widget.List.extend({
    root: '.notebook-list',
    itemSelector: '.single-notebook',

    clickByName: function(name) {
      return this.findAll(this.itemSelector).then(function(nodes) {
        return $.filter(nodes, function(n) {
          return n.getInnerHtml().then(function(t) {
            return t.search(name) != -1;
          });
        })
        .then(function(filtered) {
          return filtered[0].findElement(Driver.By.css('.open'));
        })
        .then(function(found) {
          return found.click();
        });
      });
    },

    getNames: function() {
      return $.map(this.findAll(this.itemSelector + " b"), function(n) {
        return n.getInnerHtml();
      });
    },

    move: function(name) {
      var _this = this;
      return this.getNames().then(function(names) {
        return _this.items().then(function(items) {
          return items[names.indexOf(name)].find('.notebook-move a').click();
        });
      });
    }
  });
};

