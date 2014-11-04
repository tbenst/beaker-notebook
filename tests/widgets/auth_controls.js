module.exports = function() {
  return this.Widgets.AuthControls = this.Widget.extend({
    root: '.auth-controls',

    getCurrentUserName: function() {
      return this.read(".signed-in");
    },

    signOut: function() {
      return this.hover({selector: '.dropdown-toggle'})
        .then(function(menu) {
          return menu.hover({selector: '.sign-out'})
            .then(function(item) {
              return item.click('.sign-out')
            })
        })
    }
  });
};
