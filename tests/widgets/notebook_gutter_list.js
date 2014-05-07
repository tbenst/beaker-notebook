module.exports = function() {
  return this.Widgets.NotebookGutterList = this.Widget.List.extend({
    root: '.notebook-gutter-list',

    getNames: function() {
      return $.map(this.items(), function(n) {
        return n.find('a').getInnerHtml();
      });
    }
  });
};

