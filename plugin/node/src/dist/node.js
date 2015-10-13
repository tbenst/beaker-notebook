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

/**
 * Node eval plugin
 * For creating and configuring evaluators that evaluate Javascript code on
 *   a remote node server and update code cell results.
 */

define(function(require, exports, module) {
    'use strict';
    var PLUGIN_NAME = "Node";
    var COMMAND = "node/nodePlugin";
    var cometdUtil = bkHelper.getUpdateService();
    var serviceBase = null;
    var NodeShCancelFunction = null;
    
    var NodeSh = {
      pluginName: PLUGIN_NAME,
      cmMode: "javascript",
      background: "#dbecb5",
      bgColor: "#8EC453",
      fgColor: "#FFFFFF",
      borderColor: "",
      shortName: "N",
      
      newShell: function(shellId, cb, ecb) {
        if (!shellId)
          shellId = "";
        bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/shell"), { shellId: shellId, sessionId: bkHelper.getSessionId() })
            .success(cb)
            .error(function() {
              console.log("failed to create shell", arguments);
              ecb("failed to create shell");
            });
      },
      evaluate: function(code, modelOutput,refreshObj) {
        var deferred = Q.defer();
        
        if (NodeShCancelFunction) {
          deferred.reject("An evaluation is already in progress");
          return deferred.promise;
        }

        var self = this;
        bkHelper.setupProgressOutput(modelOutput);
        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/evaluate"),
          data: {shellId: self.settings.shellID, code: code}
        }).done(function(ret) {
          NodeShCancelFunction = function () {
            $.ajax({
              type: "POST",
              datatype: "json",
              url: bkHelper.serverUrl(serviceBase + "/cancelExecution"), //TODO
              data: {shellId: self.settings.shellID}
            }).done(function (ret) {
              console.log("done cancelExecution",ret);
            });
            bkHelper.setupCancellingOutput(modelOutput);
          }
          var onEvalStatusUpdate = function(evaluation) {
            if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
              cometdUtil.unsubscribe(evaluation.update_id);
              NodeShCancelFunction = null;
              if (evaluation.status === "ERROR")
                deferred.reject(evaluation.payload);
              else
                deferred.resolve(evaluation.payload);
            }
            if (refreshObj !== undefined)
              refreshObj.outputRefreshed();
            else
              bkHelper.refreshRootScope();
          };
          onEvalStatusUpdate(ret);
          if (ret.update_id) {
            cometdUtil.subscribe(ret.update_id, onEvalStatusUpdate);
          }
        });
        return deferred.promise;
      },
      interrupt: function() {
        this.cancelExecution();
      },
      cancelExecution: function () {
        if (NodeShCancelFunction) {
          NodeShCancelFunction();
        }
      },
      resetEnvironment: function () {
        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/resetEnvironment"), //TODO
          data: {shellId: this.settings.shellID}
        }).done(function (ret) {
          console.log("done resetEnvironment",ret);
        });
      },
      killAllThreads: function () {
        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/killAllThreads"), //TODO
          data: {shellId: this.settings.shellID}
        }).done(function (ret) {
          console.log("done killAllThreads",ret);
        });
      },
      autocomplete: function(code, cpos, cb) {
        var self = this;
        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/autocomplete"), //TODO
          data: {shellId: self.settings.shellID, code: code, caretPosition: cpos}
        }).done(function(x) {
          cb(x, undefined, true);
        });
      },
      exit: function(cb) {
        var self = this;
        this.cancelExecution();
        NodeShCancelFunction = null;
        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/exit"), //TODO
          data: { shellId: self.settings.shellID }
        }).done(cb);
      },
      updateShell: function (cb) {
        var p = bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/setShellOptions"), { //TODO
          shellId: this.settings.shellID,
          classPath: this.settings.classPath,
          imports: this.settings.imports,
          outdir: this.settings.outdir});
        if (cb) {
          p.success(cb);
        }
      },
      spec: {
      },
      cometdUtil: cometdUtil
    };
    var defaultImports = [];
    var shellReadyDeferred = bkHelper.newDeferred();
    
    var init = function() {
      bkHelper.locatePluginService(PLUGIN_NAME, {
        command: COMMAND,
        waitfor: "Started SelectChannelConnector",
        recordOutput: "true"
      }).success(function(ret) {
        serviceBase = ret;
        bkHelper.spinUntilReady(bkHelper.serverUrl(serviceBase + "/ready")).then(function () { //TODO
          if (window.languageServiceBase == undefined) {
            window.languageServiceBase = {};
          }
          window.languageServiceBase[PLUGIN_NAME] = bkHelper.serverUrl(serviceBase + '');
          if (window.languageUpdateService == undefined) {
            window.languageUpdateService = {};
          }
          window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
          cometdUtil.init(PLUGIN_NAME, serviceBase);

          var NodeShell = function(settings, doneCB, ecb) {
            var self = this;
            var setShellIdCB = function(id) {
              settings.shellID = id;
              self.settings = settings;
              var imports = [];
              if ("imports" in self.settings) {
                imports = self.settings.imports.split('\n');
              }
              self.settings.imports = _.union(imports, defaultImports).join('\n');
              var cb = function() {
                if (doneCB) {
                  doneCB(self);
                }
              };
              self.updateShell(cb);
            };
            if (!settings.shellID) {
              settings.shellID = "";
            }
            var newShellErrorCb = function(reason) {
              if (ecb) {
                ecb(reason);
              }
            };
            this.newShell(settings.shellID, setShellIdCB, newShellErrorCb);
            this.perform = function(what) {
              var action = this.spec[what].action;
              this[action]();
            };
          };
          NodeShell.prototype = NodeSh;
          shellReadyDeferred.resolve(NodeShell);
        }, function () {
          console.log("plugin service failed to become ready", PLUGIN_NAME, arguments);
          shellReadyDeferred.reject("plugin service failed to become ready");
        });
      }).error(function() {
        console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
        shellReadyDeferred.reject("failed to locate plugin service");
      });
    };
    init();

    exports.getEvaluatorFactory = function() {
      return shellReadyDeferred.promise.then(function(Shell) {
        return {
          create: function(settings) {
            var deferred = bkHelper.newDeferred();
            new Shell(settings, function(shell) {
              deferred.resolve(shell);
            }, function(reason) {
              deferred.reject(reason);
            });
            return deferred.promise;
          }
        };
      },
      function(err) { return err; });
    };

    exports.name = PLUGIN_NAME;
});