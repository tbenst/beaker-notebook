var path = require('path');

module.exports = function() {
  return this.Widgets.ImportNotebooks = this.Widget.extend({
    root: '.import-notebooks',
    fileUploadSelector: 'input',

    startImport: function() {
      var method = "Sizzle('" + this.root + " " + this.fileUploadSelector +
        "')[0].style.display = 'block';";
      return this.driver.executeScript(method);
    },

    attachFile: function(file) {
      return this.find(this.fileUploadSelector).sendKeys(
        path.resolve('../app/seed_files', file));
    }
  });
};
