module.exports = function() {
  return this.Widgets.MainNav = this.Widget.extend({
    root: '.main-nav',

    visitProjects: function() {
      return this.click('.projects');
    },
    visitMarketPlace: function() {
      return this.click('.market-place');
    }
  });
};
