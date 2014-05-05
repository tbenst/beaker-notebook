var path = require('path');

module.exports = function() {
  return this.Widgets.ImportNotebooks = this.Widget.extend({
    root: '.import-notebooks',

    import: function() {
      return this.click('.import');
    },

    attachFile: function(file) {
      return this.find("input").sendKeys(path.resolve('../app/seed_files', file));
    }
  });
};
