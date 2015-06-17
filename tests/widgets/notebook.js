var Driver = require('selenium-webdriver');
var Promise = require('bluebird');

module.exports = function() {
  var World = this;
  return this.Widgets.Notebook = this.Widget.extend({
    root: '.notebook',

    openOptions: function() {
      return this.click('.main-content .options');
    },

    save: function() {
      return this.openOptions().then(function() {
        return this.click('.save-menuitem');
      }.bind(this));
    },

    saveAs: function(name) {
      var _this = this;
      return this.openOptions().then(function() {
        return this.click('.save-as-menuitem');
      }.bind(this))
      .then(function() {
        var modal = new World.Widgets.Modal();
        return modal.fill({ selector: '.name', value: name }).then(function() {
          return modal.submit();
        });
      });
    },

    close: function() {
      return this.openOptions().then(function() {
        return this.click('.close-menuitem');
      }.bind(this));
    },

    name: function() {
      return this.read('.name .name-text');
    },

    openRenameModal: function() {
      return this.openOptions().then(function() {
        return this.click('.rename-menuitem');
      }.bind(this));
    },

    openModalAndRename: function(newName) {
      return this.openRenameModal().then(function() {
        var renameModal = new World.Widgets.Modal();
        return renameModal.fill({ selector: "input.name", value: newName }).then(function() {
          return renameModal.submit();
        });
      });
    },

    openPublishModal: function() {
      // This delay is because since we are opening
      // a new notebook iframe it causes the JS evaluator to
      // get bogged down. Thus preventing the digest loop
      // from even happening thus the target of this click
      // was doing nothing.
      return Promise.delay(10000).then(function() {
        return this.click('.sidebar-box .content .publish');
      }.bind(this));
    },

    publishStatus: function() {
      return this.read('.publish-status');
    },

    isPublic: function() {
      return this.find(".publish-status.public");
    },

    isPrivate: function() {
      return this.find(".publish-status.private");
    },

    viewPublished: function() {
      return this.click('.view-published');
    },

    publishTime: function() {
      return this.read('.publish-time');
    },

    updateTime: function() {
      return this.read('.update-time');
    },

    goToUpdatePublication: function() {
      return this._openPublicationOptions().then(function() {
        return this.click('.update-publication');
      }.bind(this));
    },

    removePublication: function() {
      return this._openPublicationOptions().then(function() {
        return this.click('.destroy-publication');
      }.bind(this))
      .then(function() {
        return new World.Widgets.Modal().accept();
      });
    },

    _openPublicationOptions: function() {
      return this.find('.publishing .bunsen-dropdown-toggle').then(function(el) {
        return new World.Widgets.Dropdown().show(el);
      });
    },

    waitForBeaker: function() {
      return this.driver.wait(function() {
        return new World.Widgets.BeakerNotebook().isPresent();
      }, 360000, 'bk-notebook not found');
    },

    beakerNotebookCount: function() {
      return this.waitForBeaker().then(function() {
        return new World.W.List({
          root: '#beaker-container',
          itemSelector: 'iframe.beaker'
        })
        .length()
      });
    },

    goToProject: function() {
      return this.click('.title-bar a.project');
    },

    sidebarsVisible: function() {
      return this.isVisible('.sidebar-left, .sidebar-right');
    },

    toggleFullscreen: function() {
      return this.click('fullscreen-toggle i');
    },
  });
};
