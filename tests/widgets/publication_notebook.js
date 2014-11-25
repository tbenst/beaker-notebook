module.exports = function() {

  this.Widgets.PublicationNotebook = this.Widget.extend({
    root: 'publication-notebook',

    toggle: function(zone) {
      return this.click('.'+zone+'-toggle');
    },

    isCollapsed: function(zone) {
      return this.isPresent('.'+zone+'-cell.collapsed');
    }
  });

  this.Widgets.PublicationNotebookHero = this.Widget.extend({
    root: '.publication .item-hero',

    author: function() {
      return this.read('.author-info .name');
    },

    authorJobTitle: function() {
      return this.read('.author-info .job');
    },

    authorCompany: function() {
      return this.read('.author-info .company');
    },

    gravatarLink: function() {
      return this.getAttribute({selector: '.publication-notebook-icon', attribute: 'src'})
    }
  });

};
