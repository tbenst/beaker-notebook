module.exports = function() {
  this.Widgets.Overview = this.Widget.extend({
    root: '.overview',

    recentlyUsedTitles: function() {
      return this.findAll('.recently-used li').then(function(recentlyUsed) {
        return $.map(recentlyUsed, function(notebook) {
          return notebook.getText();
        });
      });
    }
  });
}
