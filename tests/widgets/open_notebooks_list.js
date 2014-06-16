module.exports = function() {
  return this.Widgets.OpenNotebookList = this.Widget.List.extend({
    root: '.open-notebooks',
    itemSelector: '.open-notebook',

    getNames: function() {
      return $.map(this.items(), function(n) {
        return n.find("a").getText();
      });
    },

    closeNotebook: function(notebookName) {
      return this.filter(function(notebook) {
        return notebook.find("a").getText().then(function(text) {
          return text === notebookName;
        });
      })
      .then(function(filtered) {
        var item = filtered[0];
        var method = "Sizzle('"+item.root+" .close-notebook')[0].style.display = 'block';";
        return this.driver.executeScript(method).then(function() {
          return item.find('.close-notebook').click();
        });
      }.bind(this));
    }

  });
};

