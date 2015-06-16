module.exports = function() {
  return this.Widgets.Admin = this.Widget.extend({
    root: '.admin-container',

    getHeader: function() {
      return this.read('h2');
    },

    goToVendors: function() {
      return this.click('a.vendors');
    },
  });
};
