var Git = require('./git'),
    util = require('util'),
    path = require('path'),
    fs = require('fs'),
    cnst = require('constants'),
    nodefn = require("when/node/function"),
    mkdirp = require("mkdirp"),
    getDirName = require("path").dirname,
    glob = require("glob"),
    when = require('when'),
    _ = require("lodash"),
    keys = require('when/keys');

// File open mode for creating notebook files, will fail if the file already exists
// More info on the const values: http://man7.org/linux/man-pages/man2/open.2.html
var RDWR_EXCL = cnst.O_CREAT | cnst.O_TRUNC | cnst.O_RDWR | cnst.O_EXCL;

// Create new notebook repo
module.exports.create = function(options) {
  var notebook = notebookFile(options['userId'], options['projectId'], options['name']);
  var git = new Git(notebook['dir']);

  return writeFile(notebook['path'], RDWR_EXCL, options['data'])
    .then(git.init.bind(git), function(e) {
      throw new Error("A notebook with '" + options['name'] + "' name already exists within this project");
    })
    .then(git.init.bind(git))
    .then(git.addToIndex.bind(git, [notebook['file']]))
    .then(function(oid) {
      return git.commit(oid, []);
    });
};

// Update existing notebook repo
module.exports.update = function(options) {
  var notebook = notebookFile(options['userId'], options['projectId'], options['name']);
  var git = new Git(notebook['dir']);

  return writeFile(notebook['path'], 'w', options['data'])
    .then(git.open.bind(git))
    .then(git.addToIndex.bind(git, [notebook['file']]))
    .then(function(oid) {
      return git.head()
        .then(function(parent) {
          return git.commit(oid, [parent]);
        });
    });
};

// Load notebook from repo
module.exports.load = function(options) {
  var notebook = notebookFile(options['userId'], options['projectId'], options['name']);
  return readFile(notebook['path'])
    .then(function(data) {
      return {
        name: options['name'],
        data: data
      };
    });
};

// List all notebooks for a given project
module.exports.list = function(options) {
  var notebooks = notebookFile(options['userId'], options['projectId'], '*/*.bkr');

  return nodefn.call(glob, notebooks.dir)
    .then(function(files) {
      return when.map(files, function(file) {
        return keys.all({
          name: path.basename(file, '.bkr'),
          lastModified: lastModified(file),
          numCommits: numCommits(file)
        });
      });
    });
};

module.exports.matchingProjectIds = function(userId, searchTerm) {
  var dir = notebookFile(userId, '**', '*.bkr').dir;

  function contains(a, b) {
    return a.toLowerCase().indexOf(b.toLowerCase()) != -1;
  }

  return nodefn.call(glob, dir)
    .then(function(files) {
      return _(files).map(function(file) {
        // Extract project id and notebook name from the file path
        var match = file.match(/^repos\/\d+\/(\d+)\/(.+)\/.+/)
        if (match.length && contains(match[2], searchTerm)) {
          // return matching project id
          return +match[1];
        }
      }).uniq().compact().value();
    });
}

function notebookFile(userId, projectId, name) {
  var file = name + ".bkr";
  var dir = path.join("repos", userId.toString(), projectId.toString(), name);
  return {
    path: path.join(dir, file),
    dir: dir,
    file: file
  };
}

function writeFile(filePath, flag, contents) {
  var data = JSON.stringify(contents, null, 4);
  return nodefn.call(mkdirp, getDirName(filePath))
     .then(nodefn.lift(fs.writeFile, filePath, data, {flag: flag, encoding: 'utf8'}));
}

function readFile(filePath) {
  return nodefn.call(fs.readFile, filePath)
    .then(function(data) {
      return JSON.parse(data);
    });
}

function lastModified(filePath) {
  return nodefn.call(fs.stat, filePath)
    .then(function(data) {
      return data.mtime;
    });
}

function numCommits(filePath) {
  var git = new Git(path.dirname(filePath));

  return git.open()
    .then(git.numCommits.bind(git));
}
