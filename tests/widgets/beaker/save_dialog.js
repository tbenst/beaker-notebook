module.exports = function() {
  this.Widgets.Beaker = this.Widgets.Beaker || {};

  return this.Widgets.Beaker.SaveDialog = this.Widget.Form.extend({
    root: '.modal',
    fields: ['saveAsFileInput'],
    submitSelector: function() {
      return this.find('.btn-primary');
    }
  });
};
