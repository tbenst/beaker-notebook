module.exports = function() {
  return this.Widgets.NotebookList = this.Widget.List.extend({
    root: '.notebook-list',
    itemSelector: '.single-notebook',

    clickByName: function(name) {
      var _this = this;

      return this.getNames().then(function(names) {
        return _this.items().then(function(items) {
          return items[names.indexOf(name)].find('a').click();
        });
      });
    },

    getNames: function() {
      return $.map(this.items(), function(n) {
        return n.find("b").getInnerHtml();
      });
    }
  });
};

