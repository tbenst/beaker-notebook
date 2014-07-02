module.exports = function() {
  this.Widgets.SidebarProjectList = this.Widget.List.extend({
    root: 'ul.project-results',
    itemSelector: 'li',
    itemNames: function() {
      return this.map(function(project) {
        return project.find().then(function(el) {
          return el.getText();
        });
      });
    }
  });
};
