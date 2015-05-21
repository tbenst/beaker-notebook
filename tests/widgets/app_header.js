module.exports = function() {
  return this.Widgets.AppHeader = this.Widget.extend({
    root: '.app-header',

    getCurrentUserName: function() {
      return this.read(".signed-in");
    },

    ensureSignedIn: function() {
      return this.find(".signed-in");
    },

    signOut: function() {
      return this.hover({selector: '.bunsen-dropdown-toggle'})
        .then(function(menu) {
          return menu.hover({selector: '.sign-out'})
            .then(function(item) {
              return item.click('.sign-out')
            })
        })
    },

    editUserInfo: function() {
      return this.hover({selector: '.bunsen-dropdown-toggle'})
        .then(function(menu) {
          return menu.click('.edit-info');
        });
    },

    clickLogo: function() {
      return this.click('.header-logo');
    },
  });
};
