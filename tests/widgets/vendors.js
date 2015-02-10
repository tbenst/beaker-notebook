module.exports = function() {
  return this.Widgets.Vendors = this.Widget.extend({
    root: '.vendors-container',

    cancelCreation: function() {
      return this.click('button.cancel');
    }
  });
};
