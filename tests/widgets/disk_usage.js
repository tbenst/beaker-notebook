module.exports = function() {
  return this.Widgets.DiskUsage = this.Widget.extend({
    root: '.disk-usage',

    getFreeSpace: function () {
      return this.read('.gigabytes')
    }
  });
}
