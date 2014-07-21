module.exports = function() {
  return this.Widgets.ProjectSearchList = this.Widget.List.extend({
    root: '.search-results',
    itemSelector: "> li",

    waitForItem: function() {
      return this.find(this.itemSelector);
    },

    click: function(index) {
      var _this = this;
      return this.waitForItem().then(function() {
        return _this.items().then(function(children) {
          return children[index].click();
        });
      });
    },

    contents: function() {
      return $.map(this.items(), function(n) {
        return $.all([n.find(".title"), n.find(".attributes .count")])
        .then(function(arr) {
          return $.all(_.invoke(arr, 'getText'))
          .then(function(text) {
            return {
              name: text[0],
              notebooks: text[1]
            }
          });
        });
      });
    },

    notebookContents: function() {
      return $.map(this.items(), function(n) {
        return $.all([n.find(".title")])
        .then(function(arr) {
          return $.all(_.invoke(arr, 'getText'))
          .then(function(text) {
            return {
              name: text[0]
            }
          });
        });
      });
    },
  });
}
