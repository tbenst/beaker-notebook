var Bluebird = require('bluebird');

module.exports = function() {
  var widgets = this.Widgets;

  return this.Widgets.BeakerFrame = this.Widget.extend({
    root: 'iframe.beaker',

    enter: function() {
      return Bluebird.delay(1000).then(function() {
        return this.driver.switchTo().frame(0);
      }.bind(this));
    },

    leave: function() {
      return this.driver.switchTo().defaultContent();
    },

    insertCell: function() {
      var _this = this;
      return this.enter().then(function() {
        return (new widgets.Beaker.InsertCell()).click();
      }).then(function() {
        return _this.leave();
      });
    }
  });
};
