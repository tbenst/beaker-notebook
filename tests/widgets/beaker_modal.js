module.exports = function() {
  return this.Widgets.BeakerModal = this.Widget.extend({
    root: '.modal-dialog',

    sayYes: function() {
      return this.click('.yes');
    },

    sayNo: function() {
      return this.click('.no');
    },

    cancel: function() {
      return this.click('.cancel');
    },

    heading: function() {
      return this.read('.modal-header');
    },

    text: function() {
      return this.read('.modal-body');
    }
  });
};
