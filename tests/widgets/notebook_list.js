module.exports = function() {
  return this.Widgets.NotebookList = this.Widget.List.extend({
    root: '.notebook-list',
    itemSelector: '.single-notebook',
    nameSelector: 'h2 a',

    clickByName: function(name) {
      var _this = this;
      this.findNotebook(name).then(function(item) {
        return item.find(_this.nameSelector).click();
      });
    },

    findNotebook: function(name) {
      var _this = this;
      return this.getNames().then(function(names) {
        return _this.items().then(function(items) {
          return items[names.indexOf(name)];
        });
      });
    },

    getNames: function() {
      return $.map(this.findAll(this.itemSelector + " " + this.nameSelector), function(n) {
        return n.getInnerHtml();
      });
    },

    move: function(name) {
      return this.findNotebook(name).then(function(item) {
        return new World.Widgets.ShowDropdown().show(item.root)
               .then(function() {
                 return item.find('.notebook-move a').click();
               });
      });
    }
  });
};

