;(function(app) {
  app.service('DataFormatService', function() {
    return {
      buildTable: function (item) {
        var arrayOfRows = item.csvPreview.split('\n');
        var columnNames = arrayOfRows[0].split(",");

        var table = _.map(arrayOfRows.slice(1, arrayOfRows.length), function (row) {
          return row.split(",");
        });

        return {
          headers: columnNames,
          body: table
        }
      }
    }
  });
})(window.bunsen);
