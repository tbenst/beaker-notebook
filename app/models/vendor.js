var _ = require('lodash');
var RecordNotUniqueError = require("../lib/record_not_unique_error");

module.exports = function(Bookshelf, app) {
  var Vendor = Bookshelf.Model.extend({
    tableName: "vendors",
    hasTimestamps: true,
    idAttrs: ["name"],
    initialize: function() {
      this.on("saving", this.validate, this);
    },
    validate: function (model, attrs, options) {
      Vendor.forge({name: attrs.name}).fetch()
      .then(function(vendor) {
        if(vendor) throw new RecordNotUniqueError('Vendor name already taken');
      });
    }
  });

  return {
    name: "Vendor",
    model: Vendor
  };
};
