module.exports = function() {
  return this.Widgets.EditUserMessage = this.Widget.extend({
    root: '.user-edit-page-message',

    getMessage: function() {
      return this.read();
    }
  });
};
