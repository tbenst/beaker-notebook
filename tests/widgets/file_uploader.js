Path = require('path');

module.exports = function() {
  this.Widgets.FileUploader = this.Widget.extend({
    root: 'file-uploader',
    upload: function(filePath) {
      return this.sendKeys({
        selector: 'input',
        keys: Path.resolve(filePath)
      })
    }
  });
};
