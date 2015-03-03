module.exports = function() {
  return this.Widgets.DiskUsage = this.Widget.extend({
    root: '.disk-usage',

    getSpaceUsed: function () {
      return this.read('.gigabytes')
    }
  });
}
