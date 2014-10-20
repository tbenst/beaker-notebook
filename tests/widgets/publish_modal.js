module.exports = function() {
  var World = this;

  this.Widgets.PublishModal = this.Widget.extend({
    root: 'modal',

    addDescription: function(description) {
      return this.fill({ selector: '.description', value: description });
    },

    selectCategory: function(category) {
      var p = global.timeout;
      global.timeout = 10000;
      return new World.Widget.Form({ root: this.root })
      .select({ text: category })
      .then(function(v) {
        global.timeout = p;
        return v;
      })
      .thenCatch(function() {
        global.timeout = p;
      })
    },

    publish: function() {
      return this.click('.publish')
      .then(this.ensureClosed.bind(this));
    },

    ensureClosed: function() {
      this.driver.wait(function() {
        return this.find()
        .then(function(el) {
          return el.isDisplayed()
        })
        .then(function(v) {
          return !v;
        })
        .thenCatch(function(e) {
          return true;
        })
      }.bind(this)
      , global.timeout)
    }
  });
}
