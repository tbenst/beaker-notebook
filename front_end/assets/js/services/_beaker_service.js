;(function(app) {
  app.service('Beaker', ['$q', 'Restangular', '$location', function($q, Restangular, $location) {
    var waitInterval = 3000;

    return {
      whenReady: function() {
        return this.provision()
        .then(this.waitForReady.bind(this));
      },

      beaker: function() {
        return Restangular.one('beaker');
      },

      beakerUrl: function() {
        return this.beaker().get()
        .then(function(res) {
          return res.url;
        });
      },

      provision: function() {
        return this.beaker().post()
        .then(function(res) {
          return $location.protocol() + "://" + res.url;
        });
      },

      waitForReady: function(url) {
        var deferred = $q.defer();
        var ready = false;
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
