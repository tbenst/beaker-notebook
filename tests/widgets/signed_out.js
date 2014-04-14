module.exports = function() {
  return this.Widgets.SignedOut = this.Widget.extend({
    root: '.signed-out',

    getMessage: function() {
      return this.read();
    }
  });
};
