;(function(app) {
  app.service('DatasetHelper', function() {
    return {
      validateDataset: function(dataset) {
        return (_.has(dataset, 'vendor') && _.has(dataset, 'category'));
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
