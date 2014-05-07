module.exports = function() {
  var widgets = this.Widgets;

  return this.Widgets.BeakerFrame = this.Widget.extend({
    root: 'iframe.beaker',

    enter: function() {
      return this.driver.switchTo().frame(0);
    },

    leave: function() {
      return this.driver.switchTo().defaultContent();
    },

    saveAs: function(name) {
      var _this = this;
      return this.enter().then(function() {
        return (new widgets.Beaker.BunsenButton()).click();
      }).then(function() {
        return (new widgets.Beaker.BunsenMenu).clickSaveAs();
      }).then(function() {
        return (new widgets.Beaker.SaveDialog()).submitWith(
          {saveAsFileInput: name});
      }).then(function() {
        return _this.leave();
      });
    },

    saveChanges: function() {
      var _this = this;
      return this.enter().then(function() {
        return (new widgets.Beaker.BunsenButton()).click();
      }).then(function() {
        return (new widgets.Beaker.BunsenMenu()).clickSave();
      }).then(function() {
        return _this.leave();
      });
    }

  });
};
