module.exports = function() {
  this.Widgets.FileListLauncher = this.Widget.extend({
    root: 'file-upload-list',

    open: function() {
      return this.click('.btn');
    }
  });

  this.Widgets.FileList = this.Widget.List.extend({
    root: '.file-upload-list',
    itemSelector: '.file-list-item',

    selectFile: function(fileName) {
      return this.findWhere(function(item) {
        return item.getText()
        .then(function(text) {
          return text.match(fileName);
        });
      })
      .then(function(item) {
        return item.click('input');
      });
    },

    clickDelete: function() {
      return this.click({text: "Delete Files"});
    },

    confirmYes: function() {
      return this.click({text: "Yes"});
    }
  });
};
