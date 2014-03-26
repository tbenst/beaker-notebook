var Git = require('./git'),
    util = require('util'),
    path = require('path'),
    fs = require('fs'),
    nodefn = require("when/node/function"),
    mkdirp = require("mkdirp"),
    getDirName = require("path").dirname,
    glob = require("glob"),
    when = require('when'),
    keys = require('when/keys');


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
