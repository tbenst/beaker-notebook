module.exports = function() {
  var World = this;
  return this.Widgets.ProjectDetail = this.Widget.extend({
    root: '.projects-root',
    projectMenu: '.project-menu',

    edit: function() {
      return new World.Widgets.Dropdown().show(this.projectMenu).then(function() {
        return this.click(".edit-project");
      }.bind(this));
    },

    name: function() {
      return this.read('.project-name');
    },

    error: function() {
      return this.read('.error');
    },

    dismissError: function() {
      return this.click('.error .close');
    },

    description: function() {
      return this.read('.project-description');
    },

    updatedAt: function() {
      return this.read('.last-updated');
    },

    numCommits: function() {
      return this.read('.num-commits');
    },

    addNewNotebook: function() {
      return this.click('.new-notebook');
    }
  });
};
