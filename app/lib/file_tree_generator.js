Promise = require('bluebird');
Walk    = require('walkdir');

module.exports = function(walkDir) {
  var files = [];

  return new Promise(function(resolve, reject) {
    if (!walkDir) {
      return reject(new Error('you must pass a directory to be walked'))
    }

    emitter = Walk(walkDir);

    emitter.on('file', function(filename, stat) {
      files.push({
        name: filename,
        stat: stat
      })
    });

    emitter.on('error', function(path, err) {
      reject(err);
    });

    emitter.on('end', function() {
      resolve(files);
    })
  })
}
