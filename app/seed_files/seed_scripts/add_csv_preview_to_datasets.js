var fs       = require('fs')
var Promise  = require('bluebird')
var readline = require('readline')
var stream   = require('stream')
var instream,
    outstream,
    rl,
    rowCount,
    numColumns
var rowLimit = 11
//folder with csv files
var folder = './csvs/'
//original data sets file
var dataSets  = require('./data_sets.js')
var count =0;

function generateCsvPreview (set) {
  var out = ""
  return new Promise( function (resolve, reject) {
    instream = fs.createReadStream(folder+set.data.remoteFile)
    outstream = new stream
    rl = readline.createInterface(instream, outstream)
    rowCount = 0

    rl.on('line', function (line) {
      rowCount++
      numColumns = line.split(',').length
      if(rowCount<=rowLimit) {
        out += line.split(',').toString() + '\n'
      }
    })

    rl.on('close', function () {
      console.log(++count)
      //close instream on file end
      instream.close();

      //remove newline from end
      out = out.trim();

      set.data.csvPreview = out;
      set.data.numColumns= numColumns;
      resolve();
    })
  })
}

Promise.reduce(dataSets, function (total, set) {
  return generateCsvPreview(set)
},0).then( function () {
  fs.writeFile('./data_sets_new.js', JSON.stringify(dataSets, null, 2).replace(/\"([^(\")"]+)\":/g,"$1:"), function (err) {
    if(err)
      throw err;
  })
})
