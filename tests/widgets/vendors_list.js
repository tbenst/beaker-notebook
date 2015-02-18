module.exports = function() {
  var vendors = new this.Widgets.Vendors();
  var modal   = new this.Widgets.Modal();

  function findVendor(vendor) {
    return this.findWhere(function(item) {
      return item.find('h2').then(function(h2) {
        return h2.getText();
      }).then(function(text) {
        return text.match(new RegExp(vendor));
      });
    });
  };

  return this.Widgets.VendorsList = this.Widget.List.extend({
    root: '.vendor-list',
    itemSelector: 'li',

    delete: function(vendor) {
      return findVendor.call(this, vendor).then(function(item) {
        return item.click('input');
      }).then(function() {
        return vendors.click('.delete');
      }).then(function() {
        return modal.accept();
      });
    },

    rename: function(vendor, newName) {
      return findVendor.call(this, vendor).then(function(item) {
        return item.click('a');
      }).then(function() {
        return modal.fill({
          selector: "input.name",
          value: newName
        });
      }).then(function() {
        return modal.submit();
      });
    },

    contains: function(vendor) {
      return findVendor.call(this, vendor).then(function(item) {
        return item.isPresent();
      });
    },
  });
};
