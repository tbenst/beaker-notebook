module.exports = function() {
  var World = this;
  return this.Widgets.Notebook = this.Widget.extend({
    root: '.notebook',

    close: function() {
      return this.find('.close-notebook').click();
    },

    name: function() {
      return this.read('.name');
    },

    openRenameModal: function() {
      return this.find('.rename').click();
    },

    openModalAndRename: function(newName) {
      return this.openRenameModal().then(function() {
        var renameModal = new World.Widgets.Modal();
        return renameModal.fill("input.name", newName).then(function() {
          return renameModal.find('.save').click();
        });
      });
    },
  });
};

