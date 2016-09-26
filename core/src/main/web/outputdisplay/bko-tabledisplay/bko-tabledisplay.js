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
 * bkoTableDisplay
 * This is the output display component for displaying tables.
 */
(function() {
  'use strict';
  (function($) {
    $.fn.dataTable.moment = function(format, locale) {
      var types = $.fn.dataTable.ext.type;
      // Add type detection
      types.detect.unshift(function(d) {
        // Null and empty values are acceptable
        if (d === '' || d === null) {
          return 'moment-' + format;
        }
        return (d.timestamp !== undefined && moment(d.timestamp).isValid()) ?
          'moment-' + format :
          null;
      });
      // Add sorting method - use an integer for the sorting
      types.order['moment-' + format + '-pre'] = function(d) {
        return d === '' || d === null ?
          -Infinity :
          parseInt(d.timestamp, 10);
      };
    };
  }(jQuery));

  $.fn.dataTable.moment('YYYYMMDD HH:mm:ss');
  $.fn.dataTable.moment('YYYYMMDD');
  $.fn.dataTable.moment('DD/MM/YYYY');
  moment.tz.link(['Etc/GMT+1|GMT+01:00',
                  'Etc/GMT+2|GMT+02:00',
                  'Etc/GMT+3|GMT+03:00',
                  'Etc/GMT+4|GMT+04:00',
                  'Etc/GMT+5|GMT+05:00',
                  'Etc/GMT+6|GMT+06:00',
                  'Etc/GMT+7|GMT+07:00',
                  'Etc/GMT+8|GMT+08:00',
                  'Etc/GMT+9|GMT+09:00',
                  'Etc/GMT+10|GMT+10:00',
                  'Etc/GMT+11|GMT+11:00',
                  'Etc/GMT+12|GMT+12:00',
                  'Etc/GMT-1|GMT-01:00',
                  'Etc/GMT-2|GMT-02:00',
                  'Etc/GMT-3|GMT-03:00',
                  'Etc/GMT-4|GMT-04:00',
                  'Etc/GMT-5|GMT-05:00',
                  'Etc/GMT-6|GMT-06:00',
                  'Etc/GMT-7|GMT-07:00',
                  'Etc/GMT-8|GMT-08:00',
                  'Etc/GMT-9|GMT-09:00',
                  'Etc/GMT-10|GMT-10:00',
                  'Etc/GMT-11|GMT-11:00',
                  'Etc/GMT-12|GMT-12:00',
                  'Etc/GMT-13|GMT-13:00',
                  'Etc/GMT-14|GMT-14:00']);
  //jscs:disable
  beakerRegister.bkoDirective('Table', ['bkCellMenuPluginManager', 'bkUtils', 'bkElectron', '$interval', 'GLOBALS',
    '$rootScope','$timeout', 'cellHighlighters', 'tableService', 'bkSessionManager', 'bkCoreManager',
    function(bkCellMenuPluginManager, bkUtils, bkElectron, $interval, GLOBALS,
             $rootScope, $timeout, cellHighlighters, tableService, bkSessionManager, bkCoreManager) {
  //jscs:enable
    var CELL_TYPE = 'bko-tabledisplay';
    var TIME_UNIT_FORMATS = {
      DATETIME:     { title: 'datetime', format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' },
      DAYS:         { title: 'date', format: 'YYYY-MM-DD' },
      HOURS:        { title: 'hours', format: 'YYYY-MM-DD HH:mm ZZ' },
      MINUTES:      { title: 'minutes', format: 'HH:mm ZZ' },
      SECONDS:      { title: 'seconds', format: 'HH:mm:ss ZZ' },
      MILLISECONDS: { title: 'milliseconds', format: 'HH:mm:ss.SSS ZZ' }
    };
    return {
      template: JST['bko-tabledisplay/output-table'],
      controller: function($scope, $uibModal) {
        $scope.id = 'table_' + bkUtils.generateId(6);
      },
      link: function(scope, element) {

        var cellModel;

        var unregisterOutputExpandEventListener = angular.noop; // used for deregistering listener

        scope.getScrollBarWidth = function () {
          var sizer = $('<p/>').css({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 150,
              padding: 0,
              overflow: 'scroll',
              visibility: 'hidden'
            })
            .appendTo('body');
          var width = sizer[0].offsetWidth - sizer[0].clientWidth;
          sizer.remove();
          return width;
        };
        scope.scrollbarWidth = scope.getScrollBarWidth();

        scope.getTheme = function () {
          return bkHelper.getTheme();
        };

        scope.$watch('getTheme()', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            if (scope.table) {
              scope.scrollbarWidth = scope.getScrollBarWidth();
              scope.table.settings()[0].oScroll.iBarWidth = scope.scrollbarWidth;
              scope.update_size();
            }
          }
        });

        scope.containerClickFunction = function(e){
        };

        scope.init = function(model, destroy) {
          console.log('bko-tabledisplay.init');
          scope.rows = [];
          if(model.hasIndex == "true"){
            model.columnNames.shift();
          }
          console.time('DataFrameTransform');
          var columnNames = model.columnNames
          var numCols = columnNames.length;
          var values = model.values;
          var numRows = values.length;
          var columnDefs = [];
          var rows = [];
          for(var r = 0; r < numRows; r++){
            var row = {};
            for(var c = 0; c < numCols; c++){
              var col = ''+columnNames[c];
              row[col] = values[r][c];
              if(columnDefs.length <= numCols){
                columnDefs.push({
                  headerName: col,
                  field: col
                });
              }
            }
            rows.push(row);
          }
          console.timeEnd('DataFrameTransform');
          scope.rows = rows;
          var gridOptions = {
              columnDefs: columnDefs,
              rowData: rows,
              enableSorting: true,
              enableFilter: true
          };

          $timeout(function(){
            var eGridDiv = document.getElementById(scope.id);
            console.log('Initializing agGrid with id='+scope.id+'.');
            //console.log(eGridDiv);
            new agGrid.Grid(eGridDiv, gridOptions);
            //scope.rows = null;
          }, 100);

          console.log('bko-tabledisplay: Done converting DataFrame into '+numRows+' rows and '+numCols+' columns.');
        };

        //jscs:disable
        scope.update_size = function() {
        //jscs:enable
          var me = $('#' + scope.id);
        };
        

        scope.evaluateTagCell = function (tag) {
          var cellOp = bkSessionManager.getNotebookCellOp();
          var result;
          if (cellOp.hasUserTag(tag)) {
            result = cellOp.getCellsWithUserTag(tag);
            bkCoreManager.getBkApp().evaluateRoot(result)
              .catch(function () {
                console.log('Evaluation failed: ' + tag);
              });
          }
        };

        scope.getDumpState = function() {
          return scope.model.getDumpState();
        };

        scope.$watch('getDumpState()', function(result) {
        });

        scope.getCellModel = function() {
          return scope.model.getCellModel();
        };
        scope.isShowOutput = function() {
          return scope.model.isShowOutput();
        };

        var tableChanged = false;

        scope.$watch('getCellModel()', function(m) {
          if(!angular.equals(m, cellModel)){
            cellModel = m;
            if (scope.update) {
              scope.applyChanges();
            } else {
              scope.init(m, true);
            }
            tableChanged = true;
          }
        });

        scope.$on('beaker.section.toggled', function(e, isCollapsed) {
          console.log('bko-tabledisplay::beaker.section.toggled');
        });

        scope.updateTableWidth = function () {
          var me = $('#' + scope.id);
          me.css('width', me.outerWidth());
        };

      }
    };
  }]);
})();
