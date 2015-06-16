module.exports = function() {
  var appHeader = this.Widget.extend({
    root: '.app-header',

    getCurrentUserName: function() {
      return this.read('.signed-in');
    },

    ensureSignedIn: function() {
      return this.find('.signed-in');
    },

    signOut: function() {
      return this.click({selector: '.bunsen-dropdown-toggle'})
        .then(function() {
          return this.find({selector: '.sign-out'})
            .then(function(item) {
              return item.click('.sign-out');
            });
        }.bind(this));
    },

    editUserInfo: function() {
      return this.click({selector: '.bunsen-dropdown-toggle'})
        .then(function(menu) {
          return this.click({text: 'Edit User Info'});
        }.bind(this));
    },

    signInToBeaker: function() {
      return this.click('a.sign-in');
    },

    signUpToBeaker: function() {
      return this.click('a.sign-up');
    },

    clickLogo: function() {
      return this.click('.header-logo');
    },
  });
  this.Widgets.AppHeader = appHeader;
  return appHeader;
};
