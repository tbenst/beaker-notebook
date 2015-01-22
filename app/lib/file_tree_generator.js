Promise = require('bluebird');
Walk    = require('walkdir');

module.exports = function(walkDir, presentationDir) {
  var files = [];

  return new Promise(function(resolve, reject) {
    if (!walkDir) {
      return reject(new Error('you must pass a directory to be walked'));
    }
    if (!presentationDir) {
      presentationDir = walkDir;
    }

    emitter = Walk(walkDir);

    emitter.on('file', function(filename, stat) {
      files.push({
        name: filename.replace(walkDir, presentationDir),
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
