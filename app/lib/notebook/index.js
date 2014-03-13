var Git = require('./git'),
    util = require('util'),
    path = require('path'),
    fs = require('fs'),
    nodefn = require("when/node/function"),
    mkdirp = require("mkdirp"),
    getDirName = require("path").dirname,
    when = require('when');


// Create new notebook repo
module.exports.create = function(options) {
  var notebook = notebookFile(options['userId'], options['projectId'], options['name']);
  var git = new Git(notebook['dir']);

  return writeFile(notebook['path'], options['data'])
    .then(git.init.bind(git))
    .then(git.addToIndex.bind(git, [notebook['file']]))
    .then(function(oid) {
      git.commit(oid, []);
    });
};

// Update existing notebook repo
module.exports.update = function(options) {
  var notebook = notebookFile(options['userId'], options['projectId'], options['name']);
  var git = new Git(notebook['dir']);

  return writeFile(notebook['path'], options['data'])
    .then(git.open.bind(git))
    .then(git.addToIndex.bind(git, [notebook['file']]))
    .then(function(oid) {
      return git.head()
        .then(function(parent) {
          git.commit(oid, [parent]);
        });
    });
};

// Load notebook from repo
module.exports.load = function(options) {
  var notebook = notebookFile(options['userId'], options['projectId'], options['name']);
  return readFile(notebook['path']);
};

function notebookFile(userId, projectId, name) {
  var file = name + ".bkr";
  var dir = path.join("repos", userId.toString(), projectId.toString(), name);
  return {
    path: path.join(dir, file),
    dir: dir,
    file: file
  };
}

function writeFile(filePath, contents) {
  var data = JSON.stringify(contents, null, 4);
  return nodefn.call(mkdirp, getDirName(filePath))
     .then(nodefn.lift(fs.writeFile, filePath, data, {encoding: 'utf8'}));
}

function readFile(filePath) {
  return nodefn.call(fs.readFile, filePath)
    .then(function(data) {
      return JSON.parse(data);
    });
}
