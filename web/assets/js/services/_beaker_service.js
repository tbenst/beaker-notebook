;(function(app) {
  app.service('Beaker', [
  '$q',
  'Restangular',
  'ProvisionerRestangular',
  '$location',
  '$sessionStorage',
  'bkUtils',
  '$rootScope',
  function($q,
           Restangular,
           Provisioner,
           $location,
           $sessionStorage,
           bkUtils,
           $rootScope) {

    var waitInterval = 3000;
    var ready = false;

    function initBeaker(user) {
      // beaker sub-modules that use cometd need the host & port to be specified explicitly:
      bkUtils.setServerRoot(location.origin + "/beaker/" + $sessionStorage.user.id + "/");
      bkUtils.setFileRoot("/");
      bkUtils.initializeCometd(bkUtils.serverUrl('beaker/cometd/'));

      // note:  the below comes straight from beakerEmbed.js,
      // an example script provided by beaker-notebook, which
      // gives an example of embedding beaker as a component inside
      // another app.
      bkUtils.getVersionInfo().then(function(versionInfo) {
        window.beaker.version = versionInfo.version;
        window.beaker.buildTime = versionInfo.buildTime;
        $rootScope.getVersion = function() {
          return window.beaker.version;
        };
        $rootScope.getBuildTime = function() {
          return window.beaker.buildTime;
        };

        // changing "ready" to true is what will let dependent
        // services know that beaker is initialized:
        ready = true;
      });

      var lastAction = new Date();
      var noteAction = function() {
        lastAction = new Date();
      };
      window.addEventListener('click', noteAction, false);
      window.addEventListener('keypress', noteAction, false);

      Q.delay(1000).then(function() {
        bkUtils.log("start", {user: user});
      });

      window.setInterval(function() {
        var now = new Date();
        if ((now - lastAction) < 60 * 1000) {
          bkUtils.log("tick", {user: user});
        }
      }, 60 * 1000);
    }


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
        var checkBeaker = function () {
          if (ready) {
            deferred.resolve(url);
          } else {
            if (!requesting) {
              requesting = true;
              Restangular.oneUrl('instance', url + "rest/util/whoami").get()
                .then(function(user) {
                  initBeaker(user);
                }, function() {
                  requesting = false;
                });
            }
            setTimeout(checkBeaker, waitInterval);
          }
        }
        checkBeaker();
        return deferred.promise;
      }
    }
  }]);
})(window.bunsen);
