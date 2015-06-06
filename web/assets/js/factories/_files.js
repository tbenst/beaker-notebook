;(function(app) {

  app.factory('FilesFactory', ['ProvisionerRestangular', function(PR) {
    return {
      getScratchSpaceFiles: function() {
        return PR.all('files').getList();
      },

      deleteChecked: function(params) {
        return PR.all('files').customDELETE('', params);
      },

      quota: function() {
        return PR.all('files').customGET('quota');
      }
    }
  }]);

})(window.bunsen);
