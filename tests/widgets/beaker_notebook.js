module.exports = function() {
  return this.Widgets.BeakerNotebook = this.Widget.extend({
    root: 'beakernotebook',

    runInFirstCell: function(code) {
      return this.find('bk-code-cell .CodeMirror').then(function(el) {
        return this.driver.executeScript('arguments[0].CodeMirror.setValue("' + code + '")', el);
      }.bind(this)).then(function() {
        return this.click('.evaluate-script');
      }.bind(this));
    },

    firstCellOutput: function() {
      return this.read('bk-output-display');
    }
  });
};
