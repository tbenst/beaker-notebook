module.exports = function() {
  return this.Widgets.PublicationNotebook = this.Widget.extend({
    root: 'publication-notebook',
    toggle: function(zone) {
      return this.click('.'+zone+'-toggle');
    },
    isCollapsed: function(zone) {
      return this.isPresent('.'+zone+'-cell.collapsed');
    }
  });
}
