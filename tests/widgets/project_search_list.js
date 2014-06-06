module.exports = function() {
  return this.Widgets.ProjectSearchList = this.Widget.List.extend({
    root: '.project-search',
    itemSelector: ".search-result-row-item",

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
        return $.all([n.find(".name a"), n.find(".vendor-item-list-attributes .count")])
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
  });
}
