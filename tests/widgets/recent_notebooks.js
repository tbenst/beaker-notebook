module.exports = function() {
  return this.Widgets.RecentNotebooks = this.Widget.List.extend({
    root: '.recent-notebooks',
    itemSelector: '.recent-notebook',

    getNames: function() {
      return $.map(this.items(), function(n) {
        return n.find('a').getInnerHtml();
      });
    }
  });
};

