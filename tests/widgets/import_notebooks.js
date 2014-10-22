var path = require('path');
var Promise = require('bluebird');

module.exports = function() {
  var World = this;

  return this.Widgets.ImportNotebooks = this.Widget.extend({
    root: '.import-notebooks',
    fileUploadSelector: '.import-notebook',

    startImport: function() {
      return this.removeClass({ selector: this.fileUploadSelector, className: 'visibility-hidden' });
    },

    attachFile: function(file) {
      return Promise.delay(1000)
      .then(function() {
        return this.sendKeys({
          selector: this.fileUploadSelector,
          keys: path.resolve('fixtures/', file)
        });
      }.bind(this));
    },

    errorMessage: function() {
      return this.read('.error');
    }
  });
};
