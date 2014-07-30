module.exports = function() {
  var World = this;

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
        var item = filtered[0]

        return item.find('.close-notebook').then(function(el) {
          return World.driver.executeScript('arguments[0].classList.add("active");', el);
        })
        .then(function() {
          return item.find('.close-notebook').click();
        });
      }.bind(this));
    }

  });
};

