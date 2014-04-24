module.exports = function() {
  return this.Widgets.Notebook = this.Widget.extend({
    root: '.notebook',

    close: function() {
      return this.find('.close-notebook').click();
    }
  });
};

