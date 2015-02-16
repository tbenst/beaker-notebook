;(function(app) {

  app.factory('FilesFactory', ['Restangular', function(R) {
    return {
      getScratchSpaceFiles: function() {
        return R.all('files').getList();
      },

      deleteChecked: function(params) {
        return R.all('files').customDELETE('', params);
      },

      quota: function() {
        return R.all('files').customGET('quota');
      }
    }
  }]);

})(window.bunsen);
