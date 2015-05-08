/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

(function() {
  'use strict';

  var initOutputDisplay = function()
  {
    ZeroClipboard.config( { swfPath: "app/images/ZeroClipboard.swf", hoverClass: 'dropdown-submenu-flash' } );
  }

  var setupBeakerConfigAndRun = function() {

    var beaker = angular.module('beaker', [
      'ngRoute',
      'ngStorage',
      'bk.core',
      'bk.evaluatePluginManager',
      'bk.controlPanel',
      'bk.mainApp',
      'bk.helper'
    ]);

    beaker.run(function($location, $route, $document, $sessionStorage,  bkUtils, bkCoreManager, bkHelper) {

      if ($sessionStorage.user !== void(0)) {
        bkUtils.setServerRoot("/beaker/" + $sessionStorage.user.id + "/");
      }

      var user;
      var lastAction = new Date();
      var beakerRootOp = {};
      bkCoreManager.init(beakerRootOp);
      Q.delay(1000).then(function() {
        $.get(bkUtils.serverUrl("beaker/rest/util/whoami"), {}, function(data) {
          user = data;
          bkUtils.log("start", {user: data});
        }, "json");
      });
      var noteAction = function() {
        lastAction = new Date();
      };
      window.addEventListener('click', noteAction, false);
      window.addEventListener('keypress', noteAction, false);
      window.setInterval(function() {
        var now = new Date();
        if ((now - lastAction) < 60 * 1000) {
          bkUtils.log("tick", {user: user});
        }
      }, 60 * 1000);
      $document.bind('keydown', function(e) {
        if (e.which === 27) {
          $('.dropdown.open .dropdown-toggle').dropdown('toggle');
        }
      });
      bkCoreManager.addImportInput();
      $document.bind('drop dragover', function (e) {
        e.preventDefault();
      });
      var counter = 0;
      $document.bind('dragenter', function (e) {
        counter++;
        $('body').addClass('dragover');
      });
      $document.bind('dragleave', function (e) {
        counter--;
        if (counter === 0) {
          $('body').removeClass('dragover');
        }
      });
      $document.bind('drop', function() {
        $('body').removeClass('dragover');
      });
      window.bkHelper = bkHelper;
      for (var i in window.beaker.postHelperHooks) {
        window.beaker.postHelperHooks[i]();
      }
    });

    beaker.run(function(bkEvaluatePluginManager) {
      // for known plugins, so we can refer to the plugin with either its name or URL
      var defaultEvaluatorUrlMap = {
        "Html": { url: "./plugin/evaluator/html.js",             bgColor: "#E3502B", fgColor: "#FFFFFF", borderColor: "",        shortName: "Ht" },
        "Latex": { url: "./plugin/evaluator/latex.js",           bgColor: "#FFFFFF", fgColor: "#030303", borderColor: "#3D4444", shortName: "La" },
        "JavaScript": { url: "./plugin/evaluator/javaScript.js", bgColor: "#EFDB52", fgColor: "#4A4A4A", borderColor: "",        shortName: "Js" }
      };

      _.chain(defaultEvaluatorUrlMap).each(function(value, key) {
        bkEvaluatePluginManager.addNameToUrlEntry(key, value);
      });

      if (window.beaker.getEvaluatorUrlMap) {
        var evaluatorsUrlMap = window.beaker.getEvaluatorUrlMap();
        _.chain(evaluatorsUrlMap).keys().each(function(key) {
          var value = evaluatorsUrlMap[key];
          bkEvaluatePluginManager.addNameToUrlEntry(key, value);
        });
      }
    });

    beaker.run(function(bkUtils, $rootScope) {
      bkUtils.getVersionInfo().then(function(versionInfo) {
        window.beaker.version = versionInfo.version;
        window.beaker.buildTime = versionInfo.buildTime;
        $rootScope.getVersion = function() {
          return window.beaker.version;
        };
        $rootScope.getBuildTime = function() {
          return window.beaker.buildTime;
        };
      });
    });
  };
  var bootstrapBkApp = function() {
    // make sure requirejs reports error
    requirejs.config({
      enforceDefine: true
    });
  };
  initOutputDisplay();
  setupBeakerConfigAndRun();
  bootstrapBkApp();
})();
