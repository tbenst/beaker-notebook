module.exports = function() {
  return this.Widgets.Modal = this.Widget.extend({
    root: 'modal',

    isDisplayed: function() {
      return this.isVisible();
    },

    accept: function() {
      return this.click('.accept');
    },

    cancel: function() {
      return this.click('.cancel');
    },

    submit: function() {
      return this.click('.submit').then(function() {
        // for some reason this now requires a double click in test
        // but not in actual env... :(
        return this.isVisible()
        .then(function() {
          return this.click('.submit');
        }.bind(this))
        .thenCatch(function() {
        });
      }.bind(this));
    },

    close: function() {
      return this.click('.ng-modal-close');
    },

    closeFromBackground: function() {
      return this.click('.ng-modal-overlay');
    },

    errorMessage: function() {
      return this.read('.error');
    },

    warningMessage: function() {
      return this.read('.warning');
    }
  });
}
