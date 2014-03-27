!(function(app) {

  app.factory('TagsFactory', function(Restangular) {
    return Restangular.one('data_tags').getList();
  });

})(window.bunsen);
