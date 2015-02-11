;(function(app) {

  app.factory('FilesFactory', ['Restangular', function(R) {
    return {
      getScratchSpaceFiles: function() {
        return R.all('files').getList();
      },

      deleteChecked: function(params) {
        return R.all('files').customDELETE('', params);
      }
    }
  }]);

})(window.bunsen);
