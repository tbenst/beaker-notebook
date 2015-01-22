module.exports = function() {
  this.Widgets.FileListLauncher = this.Widget.extend({
    root: 'file-upload-list',

    open: function() {
      return this.click('.btn');
    }
  });

  this.Widgets.FileList = this.Widget.List.extend({
    root: '.file-upload-list',
    itemSelector: 'li'
  });

};
