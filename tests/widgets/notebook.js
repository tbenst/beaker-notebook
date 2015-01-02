var Driver = require('selenium-webdriver');
var Promise = require('bluebird');

module.exports = function() {
  var World = this;
  return this.Widgets.Notebook = this.Widget.extend({
    root: '.notebook',

    openOptions: function() {
      return this.hover('.main-content .options');
    },

    save: function() {
      return this.openOptions().then(function() {
        return this.click('.save');
      }.bind(this));
    },

    saveAs: function(name) {
      var _this = this;
      return this.openOptions().then(function() {
        return this.click('.save-as');
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
        return this.click('.close-notebook');
      }.bind(this));
    },

    name: function() {
      return this.read('.name');
    },

    openRenameModal: function() {
      return this.openOptions().then(function() {
        return this.click('.rename');
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
      return Promise.delay(1000).then(function() {
        return this.click('.sidebar-box .content .publish');
      }.bind(this));
    },

    publishStatus: function() {
      return this.read('.publish-status');
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
      return this.find('.publishing .dropdown-toggle').then(function(el) {
        return new World.Widgets.Dropdown().show(el);
      });
    },

    waitForBeaker: function() {
      return this.driver.wait(function() {
        return new World.W({ root: 'iframe.beaker' }).isPresent();
      }, 120000, 'iframe.beaker not found');
    }
  });
};
