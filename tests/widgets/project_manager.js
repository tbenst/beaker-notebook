module.exports = function() {
  return this.Widgets.ProjectManager = this.Widget.List.extend({
    root: '.projects-root',
    itemSelector: '.project',

    createNew: function() {
      return this.click('.create-project');
    },

    waitForItem: function() {
      return this.find(this.itemSelector);
    }
  });
};
