module.exports = function() {
  return this.Widgets.NotebookiFrames = this.Widget.List.extend({
    root: '#beaker-container',
    itemSelector: 'iframe',

    hasVisible: function() {
      return this.invoke('isVisible').then(function(iframes) {
        return iframes.indexOf(true) != -1;
      })
    }
  });
};
