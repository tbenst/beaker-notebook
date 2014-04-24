module.exports = function() {
  return this.Widgets.OpenNotebookList = this.Widget.List.extend({
    root: '.open-notebooks',
    itemSelector: '.open-notebook',

    getNames: function() {
      return $.map(this.items(), function(n) {
        return n.find("a").getInnerHtml();
      });
    }
  });
};

