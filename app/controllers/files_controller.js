var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = function(app) {
  var User = app.Models.User;

  return {
    index: function(req, res, next) {
      User.forge({id: req.signedCookies.user})
      .fetch()
      .then(function(user) {
        return user.getScratchSpaceContents();
      })
      .then(res.json.bind(res))
      .catch(next);
    },

    uploadFile: function(req, res, next) {
      if (!req.files || !req.files.file) {
        // Unprocessable entity
        return res.status(422).end();
      }

      var file = req.files.file;
      var newFilePath = path.join(req.user.ensureScratchSpace(), file.originalFilename);

      var readSteam  = fs.createReadStream(file.path);
      var writeStream = fs.createWriteStream(newFilePath);

      readSteam
      .pipe(writeStream);

      readSteam.on('error', next);

      writeStream.on('error', function (err) {
        if (err.code === 'ENOSPC') {
          res.status(422).send("Disk quota exceeded");
        }
      });

      readSteam.on('end', function(){
        res.status(200).end();
      });
    },
  }
}
