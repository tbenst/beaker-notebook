var $ = require('selenium-webdriver').promise;

module.exports = function() {
  var World = this;
  return this.Widgets.NotebookList = this.Widget.List.extend({
    root: '.notebook-list',
    itemSelector: '.bunsen-list-item',
    otherProjectsDropdownSelector: '.project-selector',
    projectSelectorNames: 'a.project',

    clickByName: function(name) {
      return this.click({ text: name });
    },

    findNotebook: function(name) {
      return World.driver.wait(function() {
        return this.filter(function(item) {
          return item.read().then(function(content) {
            return content.match(name);
          });
        }).then(function(items) {
          return items[0];
        });
      }.bind(this), global.timeout);
    },

    findProjectInDropdown: function(item, name) {
      return this.getProjectNames(item).then(function(names) {
        return item.findAll(this.projectSelectorNames).then(function(items) {
          return items[names.indexOf(name)];
        }.bind(this));
      }.bind(this));
    },

    openRenameModal: function(name) {
      var _this = this;
      return this.findNotebook(name)
      .then(function(item) {
        return item.hover({ selector: '.dropdown-toggle' })
        .then(function() {
          return item.find('.rename')
          .then(function(el) {
            return _this.driver.executeScript("arguments[0].scrollIntoView(true);", el)
            .then(function() {
              return el.click();
            });
          });
        });
      });
    },

    openModalAndRename: function(name, newName) {
      return this.openRenameModal(name).then(function() {
        return this.rename(newName);
      }.bind(this));
    },

    destroy: function(name) {
      return this.findNotebook(name)
      .then(function(item) {
        return item.hover({ selector: '.dropdown-toggle' })
        .then(function() {
          return item.click('.destroy');
        });
      })
    },

    rename: function(newName) {
      var renameModal = new World.Widgets.Modal;
      return renameModal.fill({ selector: "input.name", value: newName })
      .then(function() {
        return renameModal.submit();
      });
    },

    getProjectNames: function(item) {
      return this.invoke({ method: 'read', arguments: [this.projectSelectorNames] });
    },

    getNames: function() {
      return this.invoke({ method: 'read', arguments: [{ selector: 'h2 a' }] });
    },

    move: function(notebook, project) {
      return this.findNotebook(notebook).then(function(item) {
        return item.hover({ selector: '.dropdown-toggle' })
        .then(function(dropdown){
          return dropdown.hover('.move');
        })
        .then(function(menuItem) {
          return menuItem.hover({selector: '.project'})
        })
        .then(function(p) {
          return p.click({ text: project });
        });
      });
    }
  });
}

