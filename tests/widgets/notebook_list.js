module.exports = function() {
  return this.Widgets.NotebookList = this.Widget.List.extend({
    root: '.notebook-list',
    itemSelector: '.single-notebook',
    nameSelector: 'h2 a',

    clickByName: function(name) {
      var _this = this;
      return this.findAll(this.itemSelector).then(function(nodes) {
        return $.filter(nodes, function(n) {
          return n.getInnerHtml().then(function(t) {
            return t.search(name) != -1;
          });
        })
        .then(function(filtered) {
          return filtered[0].findElement(Driver.By.css(_this.nameSelector));
        })
        .then(function(found) {
          return found.click();
        });
      });
    },

    getNames: function() {
      return $.map(this.findAll(this.itemSelector + " " + this.nameSelector), function(n) {
        return n.getInnerHtml();
      });
    },

    move: function(name) {
      var _this = this;
      return this.getNames().then(function(names) {
        return _this.items().then(function(items) {
          var item = items[names.indexOf(name)];
          var method = "Sizzle('"+item.root+" .drop-down-child')[0].style.display = 'block';";
          return _this.driver.executeScript(method).then(function() {
            return item.find('.notebook-move a').click();
          });
        });
      });
    }
  });
};

