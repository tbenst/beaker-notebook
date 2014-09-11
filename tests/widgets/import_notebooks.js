var path = require('path');

module.exports = function() {
  var World = this;

  return this.Widgets.ImportNotebooks = this.Widget.extend({
    root: '.import-notebooks',
    fileUploadSelector: '.import-notebook',

    startImport: function() {
      return this.removeClass({ selector: this.fileUploadSelector, className: 'visibility-hidden' });
    },

    attachFile: function(file) {
      return this.sendKeys({
        selector: this.fileUploadSelector,
        keys: path.resolve('fixtures/', file)
      });
    },

    errorMessage: function() {
      return this.read('.error');
    }
  });
};
