module.exports = function() {
  var World = this;

  this.Widgets.Publication = this.Widget.extend({
    root: '.publication',

    name: function() {
      return this.read('.name');
    },

    description: function() {
      return this.read('.description');
    },

    goToOpenInBunsen: function() {
      return this.click('.copy-notebook');
    }
  });

  this.Widgets.copyNotebookModal = this.Widget.extend({
    root: 'modal',

    selectProject: function(project) {
      return new World.Widget.Form({ root: this.root })
      .select({ text: project });
    },

    nameNotebook: function(name) {
      return this.fill({ selector: '.name', value: name });
    }
  });

  this.Widgets.PublicationListItem = this.Widget.extend({
    root: '.bunsen-list-item',

    name: function() {
      return this.read('h2 a');
    },

    author: function() {
      return this.read('.author .name');
    },

    authorJobTitle: function() {
      return this.read('.author .job-title');
    },

    authorCompany: function() {
      return this.read('.author .company');
    },

    languages: function() {
      return this.findAll('language-icon').then(function(languageIcons) {
        return languageIcons.invoke('read').then(function(languages) {
          return languages.join(', ');
        });
      });
    }
  });

  this.Widgets.PublicationList = this.Widget.List.extend({
    root: '.publication-list',
    itemSelector: '.bunsen-list-item',
    itemClass: this.Widgets.PublicationListItem
  });

  this.Widgets.PublicationSearch = this.Widget.extend({
    root: '.publication-search',

    search: function(text) {
      return this.fill(text);
    }
  });

  this.Widgets.PublicationCategoriesList = this.Widget.List.extend({
    root: '.publication-categories',

    count: function(category) {
      return this.find({text: category}).then(function(el) {
        return World.driver.executeScript('return arguments[0].parentNode.getElementsByClassName("count")[0].innerText', el);
      })
    },

    clickCategory: function(category) {
      return this.click({ text: category });
    }
  });

  this.Widgets.PublicationCategoryHero = this.Widget.extend({
    root: '.publications .category-hero',

    description: function() {
      return this.read('.description');
    }
  });
};
