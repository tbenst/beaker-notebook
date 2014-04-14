module.exports = function() {
  return this.Widgets.AuthControls = this.Widget.extend({
    root: '.auth-controls',

    getCurrentUserEmail: function() {
      return this.read(".signed-in");
    },

    signOut: function() {
      return this.click(".sign-out");
    }
  });
};
