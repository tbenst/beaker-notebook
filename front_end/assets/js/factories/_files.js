;(function(app) {

  app.factory('FilesFactory', ['Restangular', function(R) {
    return {
      getScratchSpaceFiles: function() {
        return R.all('files').getList();
      }
    }
  }]);

})(window.bunsen);
