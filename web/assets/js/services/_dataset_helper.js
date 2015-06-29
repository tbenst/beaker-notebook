;(function(app) {
  app.service('DatasetHelper', function() {
    return {
      validateDataset: function(dataset) {
        return (_.has(dataset, 'vendor') && dataset.categories !== undefined && this.validateCategories(dataset.categories));
      },

      validateCategories: function(categories) {
        var valid = true;
        categories.forEach(function(cat) {
          if (cat.name === undefined) {
            valid = false;
          }
        });
        return valid;
      },

      generateError: function() {
        return {
          editMessage: 'Error: Vendor and Category are required.',
          messageClass: 'error'
        };
      }
    };
  });
})(window.bunsen);
