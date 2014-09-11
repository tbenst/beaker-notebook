module.exports = function() {
  return this.Widgets.ProjectSearch = this.Widget.extend({
    root: '.projects-root',

    search: function(text) {
      return this.fill({ selector: ".project-search", value: text });
    },

    getCount: function() {
      return this.read('.project-count')
    }
  });
}
