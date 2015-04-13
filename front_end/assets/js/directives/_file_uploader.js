;(function(angular, app) {

  // A basic event emitter pattern
  // to allow us to handle multiple
  // states of an upload
  // such as progress, failure, error, success
  function Emitter() { this.listeners = {}; }

  Emitter.prototype.emit = function(name) {
    var args = Array.prototype.slice.call(arguments, 0);

    if (this.listeners[name]) {
      this.listeners[name].forEach(function(cb) {
        cb.call(this, args);
      });
    }
    return this;
  };

  Emitter.prototype.on = function(name, cb) {
    this.listeners[name] = this.listeners.name || [];
    this.listeners[name].push(cb);
    return this;
  };

  function upload(files) {
    var emitter = new Emitter();
    var data = new FormData();
    var req = new XMLHttpRequest();

    // https://developer.mozilla.org/en-US/docs/Web/API/FileList
    // since filelist does not have a forEach method
    for(var i = 0, l = files.length; i < l; ++i) {
      data.append("file", files[i]);
    }

    req.onload = function(e) {
      if (this.status != 200) {
        return emitter.emit("error", e);
      }

      return emitter.emit("end", e);
    };

    req.open("POST", "/api/files", true);

    req.upload.onprogress = function(e) {
      return emitter.emit("progress", e);
    };

    req.send(data);

    return emitter;
  }

  app.directive('fileUploader', ['$timeout', function($timeout) {
    var messages = {
      uploaded: function(i) {return i > 1 ? "Files have been uploaded" : "File has been uploaded";},
      failed: function(i) {return i > 1 ? "Files haven't been uploaded correctly" : "File hasn't been uploaded correctly";}
    };

    return {
      restrict: "E",
      template: templates['directives/file_uploader'],
      scope: {
        message: '=',
        onUploaded: '&',
        uploadPercentage: '='
      },
      controller: ['$scope', function($scope) {
        var timeout;

        $scope.onFileSet = function(files) {
          // Since Angular has no idea about the invocation of this method
          // (from the DOM node onchange)
          // we need to manually apply changes to the state when we make them.

          if (!files || files.length === 0) {
            return;
          }

          function formatMessage(type, details) {
            return details || messages[type](files.length);
          }

          function showMessage(msg, seconds) {
            if (timeout) {$timeout.cancel(timeout);}
            if (seconds) {
              timeout = $timeout(function() {
                delete $scope.message;
              }, seconds * 1000);
            }
            $scope.message = msg;
          }

          upload(files)
          .on("end", function() {
            $scope.$apply(function() {
              showMessage(formatMessage("uploaded"), 5);
              $scope.onUploaded();
              $scope.uploadPercentage = undefined;
            });
          })
          .on("error", function(err) {
            var req = err[1].target;
            $scope.$apply(function() {
              var errorMessage = formatMessage("failed", req.status == 422 && req.responseText);
              showMessage(errorMessage, 30);
              $scope.uploadPercentage = undefined;
            });
          })
          .on("progress", function(e) {
            if (e[1].lengthComputable) {
              $scope.$apply(function() {
                $scope.uploadPercentage = (e[1].loaded / e[1].total) * 100;
              });
            }
          });
        };
      }]
    };
  }]);

})(angular, window.bunsen);
