module.exports = function() {
  return this.Widgets.Modal = this.Widget.extend({
    root: 'modal',

    isDisplayed: function() {
      return this.find().then(function(el) {
        return el.isDisplayed();
      });
    },

    cancel: function() {
      return this.click('.cancel');
    },

    close: function() {
      return this.find('.ng-modal-close').click();
    },

    closeFromBackground: function() {
      return this.find('.ng-modal-overlay').click();
    },

    errorMessage: function() {
      return this.read('.error');
    }
  });
}
