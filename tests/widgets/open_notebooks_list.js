module.exports = function() {
  var World = this;

  return this.Widgets.OpenNotebookList = this.Widget.List.extend({
    root: '.open-notebooks',
    itemSelector: '.open-notebook',

    getNames: function() {
      return this.invoke({ method: 'read', arguments: ['a'] });
    },

    closeNotebook: function(notebookName) {
      return this.filter(function(notebook) {
        return notebook.read("a").then(function(text) {
          return text === notebookName;
        });
      })
      .then(function(filtered) {
        var item = filtered[0]

        return item.addClass({ className: 'active', selector: '.close-notebook' })
        .then(function() {
          return item.click('.close-notebook');
        });
      }.bind(this));
    }

  });
};

