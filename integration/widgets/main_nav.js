module.exports = function() {
  return this.Widgets.MainNav = this.Widget.extend(function() {
    this.root = '.main-nav';

    this.visitProjects = function() {
      this.click('.projects');
    };
  });
};
