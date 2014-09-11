module.exports = function() {
  return this.Widgets.TabList = this.Widget.List.extend({
    root: '.tabs',

    clickTab: function(tab) {
      return this.click({ text: tab });
    }
  });
}
