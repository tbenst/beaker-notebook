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
 * bkSparkConfigurationCtrl
 */

(function() {
  'use strict';
  var module = angular.module('bk.core');

  module.controller(
    'sparkConfigurationCtrl',
    ['$scope', '$rootScope', '$uibModalInstance', 'bkCoreManager', 'bkSessionManager',
     'bkMenuPluginManager', 'bkEvaluatePluginManager', 'bkEvaluatorManager', 'GLOBALS',
     'bkUtils', 'bkSparkContextManager',
     function($scope, $rootScope, $uibModalInstance, bkCoreManager, bkSessionManager,
              bkMenuPluginManager, bkEvaluatePluginManager,
              bkEvaluatorManager, GLOBALS, bkUtils, bkSparkContextManager) {

    $scope.showAdvanced = false;
    $scope.toggleAdvanced = function() {
      $scope.showAdvanced = !$scope.showAdvanced;
    };

    $scope.doClose = function() {
      $uibModalInstance.close("ok");
    };

    $scope.isConnected = function() {
      return bkSparkContextManager.isConnected();
    };

    $scope.isConnecting = function() {
      return bkSparkContextManager.isConnecting();
    };

    $scope.isDisconnecting = function() {
      return bkSparkContextManager.isDisconnecting();
    };

    $scope.start = function() {
      bkSparkContextManager.connect();
    };

    $scope.stop = function() {
      bkSparkContextManager.disconnect();
    };



    $scope.edited = false;
    $scope.editedEvalutor = "";

    $scope.discardChanges = function() {
      $scope.$broadcast(GLOBALS.EVENTS.DISCARD_LANGUAGE_SETTINGS);
    };

    $scope.navigateToModifiedTab = function() {
      $scope.$broadcast(GLOBALS.EVENTS.HIGHLIGHT_EDITED_LANGUAGE_SETTINGS);
      $scope.evalTabOp.setActiveTab($scope.editedEvalutor);
    };

    $scope.performOnClosingCleanup = function() {
      $scope.evalTabOp.showURL = false;
      $scope.evalTabOp.showWarning = false;
      $scope.evalTabOp.showSecurityWarning = false;
      $scope.evalTabOp.forceLoad = false;
      $scope.evalTabOp.newPluginNameOrUrl = "";
    };

    $scope.closePermitted = false;
    $scope.$on('modal.closing', function(event, reason, closed) {
      if ($scope.edited) {
        if (!$scope.closePermitted) {
          event.preventDefault();
          bkHelper.show2ButtonModal('Discard your changes to the settings?', 'Discard changes',
              function() {
                $scope.discardChanges();
                $scope.performOnClosingCleanup();
                $scope.closePermitted = true;
                $scope.doClose();
              },
              function() {
                $scope.navigateToModifiedTab();
              },
              "Ok", "Cancel", "", "");
        }
      } else {
        $scope.performOnClosingCleanup();
      }
    });
  }]);

})();
