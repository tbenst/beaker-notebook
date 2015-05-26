;(function(app) {
  app.service('Beaker',
    ['$q', 'Restangular', 'ProvisionerRestangular', '$location', '$sessionStorage',
    function($q, Restangular, Provisioner, $location, $sessionStorage) {

    var waitInterval = 3000;
    var ready = false;

    return {
      whenReady: function() {
        return this.provision()
        .then(this.waitForReady.bind(this))
        .catch(this.handleErr);
      },

      isReady: function() {
        return ready;
      },

      beaker: function() {
        return Provisioner.one('instance');
      },

      getBeakerInstance: function() {
        return this.beaker().get()
        .then(function(res) {
          return res;
        });
      },

      handleErr: function(e) {
        return e.status == 504 ? 'timeout' : 'error';
      },

      provision: function() {
        var id = $sessionStorage.user.id;
        return this.beaker().post()
        .then(function(res) {
          return '/beaker/' + id + '/beaker/';
        });
      },

      waitForReady: function(url) {
        var deferred = $q.defer();
        var requesting = false;
        // Ping the instance at 3s intervals until it's ready
        var interval = setInterval(function () {
          if (ready) {
            clearInterval(interval);
            deferred.resolve(url);
          } else if (!requesting) {
            requesting = true;
            Restangular.oneUrl('instance', url + "rest/util/whoami").get()
            .then(function() {
              ready = true;
            }, function() {
              requesting = false;
            })
          }
        }, waitInterval);
        return deferred.promise;
      }
    }
  }]);
})(window.bunsen);
