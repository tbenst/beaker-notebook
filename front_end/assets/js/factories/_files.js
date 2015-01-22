;(function(app) {

  app.factory('FilesFactory', ['Restangular', function(R) {
    return {
      getScratchSpaceFiles: function() {
        return R.all('users').customGET('scratchspace_files');
      }
    }
  }]);

})(window.bunsen);
