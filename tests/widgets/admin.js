module.exports = function() {
  return this.Widgets.Admin = this.Widget.extend({
    root: '.roots .admin',

    getHeader: function() {
      return this.read('h1');
    }
  });
};
