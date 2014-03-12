module.exports = function() {
  return this.Widgets.ProjectManager = this.Widget.List.extend(function() {
    this.root = '.manage-projects';
    this.itemSelector = '.project';

    this.createNew = function() {
      this.click('.create-project');
    };

    this.waitForItem = function() {
      this.find(this.itemSelector);
    };
  });
};
