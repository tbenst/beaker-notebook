module.exports = function() {
  return this.Widgets.RecentNotebooks = this.Widget.List.extend({
    root: '.recently-used',
    itemSelector: '.recent-notebook',

    showList: function() {
      return this.hover();
    },

    clickItem: function(name) {
      return this.click({ text: name });
    },

    getNames: function() {
      return this.showList().then(function() {
        return this.invoke({ method: 'read', arguments: ['a'] });
      }.bind(this));
    }
  });
};

