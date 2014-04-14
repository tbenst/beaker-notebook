module.exports = function() {
  return this.Widgets.ProjectSearchList = this.Widget.List.extend({
    root: '.project-search',
    itemSelector: "li",

    click: function(index) {
      return this.items().then(function(children) {
        return children[index].click();
      });
    }
  });
}
