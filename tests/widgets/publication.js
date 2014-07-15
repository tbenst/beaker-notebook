module.exports = function() {
  this.Widgets.Publication = this.Widget.extend({
    root: '.publication',

    name: function() {
      return this.read('.name');
    },

    description: function() {
      return this.read('.description');
    }
  });

  this.Widgets.PublicationListItem = this.Widget.extend({
    root: '.bunsen-list-item',

    name: function() {
      return this.read('h2 a');
    }
  });

  this.Widgets.PublicationList = this.Widget.List.extend({
    root: '.publication-list',
    itemSelector: '.bunsen-list-item',
    itemClass: this.Widgets.PublicationListItem
  });
};
