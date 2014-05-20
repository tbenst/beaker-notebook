module.exports = function() {
  return this.Widgets.Error = this.Widget.extend({
    root: '.error',

    getMessage: function() {
      return this.read();
    }
  });
};
