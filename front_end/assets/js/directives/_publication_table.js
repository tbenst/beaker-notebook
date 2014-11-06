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
 * publicationTableDisplay
 * This is the output display component for displaying tables.
 */
;(function(angular, app) {
  'use strict';
  app.directive('publicationTable', function() {
    return {
      restrict: 'E',
      scope: {
        cell: '='
      },
      template: templates['publications/publication_table'],
      controller: ['$scope', function($scope) {
        var columnNames = $scope.cell.output.result.tableDisplayModel.columnNames;
        var rows = $scope.cell.output.result.tableDisplayModel.values;

        var colDefs = _(columnNames).compact().map(function(column) {
          return {name: column, resizable: true, width: 150, sortable: true};
        }).value()

        function createData(columnNames, rows) {
          return _.map(rows, function(row) {
            return _.transform(columnNames, function(result, column, index) {
              return result[column] = row[index];
            })
          })
        }
        var tableData = createData(columnNames, rows);

        $scope.gridOptions = {
          columnDefs: colDefs,
          data: tableData
        }

      }]
    };
  });
})(angular, window.bunsen);

