module.exports = function() {
  var World = this;
  return this.Widgets.NotebookList = this.Widget.List.extend({
    root: '.notebook-list',
    itemSelector: '.bunsen-list-item',
    nameSelector: 'h2 a',
    otherProjectsDropdownSelector: '.project-selector',
    projectSelectorNames: 'a.project',

    clickByName: function(name) {
      var _this = this;
      return this.findNotebook(name).then(function(item) {
        return item.find(_this.nameSelector).click();
      });
    },

    findNotebook: function(name) {
      var _this = this;
      return this.getNames().then(function(names) {
        return _this.items().then(function(items) {
          return items[names.indexOf(name)];
        });
      });
    },

    findProjectInDropdown: function(item, name) {
      return this.getProjectNames(item).then(function(names) {
        return item.findAll(this.projectSelectorNames).then(function(items) {
          return items[names.indexOf(name)];
        }.bind(this));
      }.bind(this));
    },

    showDropdown: function(item) {
      return item.find('.dropdown-toggle')
      .then(function(el) {
        return new World.Widgets.Dropdown().show(el);
      });
    },

    openRenameModal: function(name) {
      var _this = this;
      return this.findNotebook(name)
      .then(function(item) {
        return _this.showDropdown(item)
        .then(function() {
          return item.find('.rename').click();
        });
      });
    },

    openModalAndRename: function(name, newName) {
      return this.openRenameModal(name).then(function() {
        return this.rename(newName);
      }.bind(this));
    },

    destroy: function(name) {
      var _this = this, item;
      return this.findNotebook(name)
      .then(function(_item) {
        item = _item;
        return _this.showDropdown(item);
      })
      .then(function() {
        return item.find('.destroy').click();
      });
    },

    rename: function(newName) {
      var renameModal = new World.Widgets.Modal;
      return renameModal.fill("input.name", newName).then(function() {
        // for some reason this now requires a double click in test
        // but not in actual env... :(
        return renameModal.click('.save').then(function() {
          return renameModal.isVisible().then(function(visible) {
            if (visible) {
              return renameModal.click('.save');
            }
          })
        });
      });
    },

    getProjectNames: function(item) {
      return $.map(item.findAll(this.projectSelectorNames), function(n) {
        return n.getInnerHtml();
      });
    },

    getNames: function() {
      return $.map(this.findAll(this.itemSelector + " " + this.nameSelector), function(n) {
        return n.getInnerHtml();
      });
    },

    move: function(notebook, project) {
      var _this = this;

      return this.findNotebook(notebook).then(function(item) {
        return _this.showDropdown(item)
        .then(function(){
          return item.find('.move').then(function(el) {
            return _this.driver.executeScript("arguments[0].classList.add('expanded')", el)
          });
        })
        .then(function() {
          return item.findByText(project).then(function(el) {
            return el.click();
          })
        });
      })
    }
  });
}

