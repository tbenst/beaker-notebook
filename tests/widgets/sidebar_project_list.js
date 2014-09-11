module.exports = function() {
  this.Widgets.SidebarProjectList = this.Widget.List.extend({
    root: 'ul.project-results',
    itemSelector: 'li',

    itemNames: function() {
      return this.invoke('read');
    }
  });
};
