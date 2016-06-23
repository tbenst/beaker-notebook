/*
 *  Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * This is the module for the UI that shows the list of evaluators and their corresponding
 * settings panel.
 */

(function() {
  'use strict';

  var module = angular.module('bk.core');

  module.directive('bkSparkProgress', 
    function($compile, $timeout, bkSparkContextManager, GLOBALS, bkUtils, bkSessionManager) {
      
      function Stage(name, url, total, failed, completed, active) {
        this.total = total;
        this.name = name;
        this.url = url;
        this.failed = function() {
          return failed;
        };
        this.completed = function() {
          return completed;
        };
        this.active = function() {
          return active;
        };
      };

      Stage.prototype.failedP = function() {
        return this.failed() / this.total * 100;
      };
      Stage.prototype.completedP = function() {
        return this.completed() / this.total * 100;
      };
      Stage.prototype.activeRP = function() {
        return (this.active() - this.failed() - this.completed()) / this.total * 100;
      };

      return {
        restrict: 'E',
        template: JST["mainapp/components/spark/sparkprogress"](),      
        replace: true,
        controller: function($scope) {
        },
        link: function(scope, element, attrs) {
          scope.stages = [
            new Stage('Stage 1', '#', 200, 2, 40, 120),
            new Stage('Stage 2', '#', 100, 30, 4, 50)
          ];

          scope.jobName = "Spark Job 42";


          scope.showSparkConfiguration = function() {
            bkHelper.showSparkConfiguration();
          };

          scope.statusClass = function() {
            if (bkSparkContextManager.isFailing())
              return 'plugin-error';
            if (bkSparkContextManager.isConnecting() || bkSparkContextManager.isDisconnecting())
              return 'plugin-loading';
            if (bkSparkContextManager.isConnected())
              return 'plugin-active';
            return 'plugin-known';
          };

          scope.isConnected = function() {
            return bkSparkContextManager.isConnected();
          };

          scope.isConnecting = function() {
            return bkSparkContextManager.isConnecting();
          };

          scope.isDisconnecting = function() {
            return bkSparkContextManager.isDisconnecting();
          };

          scope.start = function() {
            bkSparkContextManager.connect();
          };

          scope.stop = function() {
            bkSparkContextManager.disconnect();
          };
        }
      };
  });

})();
