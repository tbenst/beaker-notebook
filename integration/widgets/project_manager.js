module.exports = function() {
  return this.Widgets.ProjectManager = this.Widget.List.extend({
    root: '.manage-projects',
    itemSelector: '.project',

    createNew: function() {
      this.click('.create-project');
    },

    waitForItem: function() {
      this.find(this.itemSelector);
    }
  });
};
