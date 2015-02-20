module.exports = function() {
  return this.Widgets.Vendors = this.Widget.extend({
    root: '.vendors-container',

    clearName: function() {
      var _this = this;

      return this.fill({
        selector: '.vendor-name',
        value: ["Vendor name"]
      }).then(function() {
        return _this.click('button.clear');
      });
    },

    nameField: function() {
      return this.read('.vendor-name');
    },

    create: function(vendor) {
      var _this = this;
      return this.fill({
        selector: '.vendor-name',
        value: [vendor]
      }).then(function() {
        return _this.click('.submit');
      });
    }
  });
};
