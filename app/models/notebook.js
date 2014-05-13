var Git         = require("../lib/notebook/git"),
    Path        = require('path'),
    fs          = require('fs'),
    cnst        = require('constants'),
    nodefn      = require("when/node/function"),
    mkdirp      = require("mkdirp"),
    when        = require('when'),
    _           = require("lodash"),
    EXTENSION   = ".bkr";

// File open mode for creating notebook files, will fail if the file already exists
// More info on the const values: http://man7.org/linux/man-pages/man2/open.2.html
var RDWR_EXCL = cnst.O_CREAT | cnst.O_TRUNC | cnst.O_RDWR | cnst.O_EXCL;

function generateNotebookFilePath() {
  var file = this.get("name") + EXTENSION;
  var dir = Path.join(__dirname, "../", ".repos", ""+ this.get("id"));

  return Path.resolve(Path.join(dir, file));
}

function addCommitCount(notebook) {
  var git = new Git(Path.dirname(generateNotebookFilePath.call(notebook)));

  return git.open()
  .then(function(repo) {
    return git.numCommits(repo).then(function(count) {
      notebook.set('numCommits', count);
      return notebook.attributes;
    });
  });
}

function readFile(filePath) {
  return nodefn.call(fs.readFile, filePath).then(JSON.parse);
}

function writeFile(filePath, flag, contents) {
  var data = JSON.stringify(contents, null, 4);

  return nodefn.call(mkdirp, Path.dirname(filePath))
         .then(nodefn.lift(fs.writeFile, filePath, data, {flag: flag, encoding: 'utf8'}));
}

function Notebook(Bookshelf, app) {
  var models  = app.Models;
  var query   = Bookshelf.knex;

  var Notebook = Bookshelf.Model.extend({
    tableName: "Notebooks",

    getData: function(data) {
      return data ? when(data) : readFile(generateNotebookFilePath.call(this))
    },

    addCommit: function(data) {
      var notebookPath = generateNotebookFilePath.call(this);
      var git = new Git(Path.dirname(notebookPath));

      return writeFile(notebookPath, 'w', data)
      .then(git.open.bind(git))
      .then(git.addToIndex.bind(git, [Path.basename(notebookPath)]))
      .then(function(oid) {
        return git.head()
          .then(function(parent) {
            return git.commit(oid, [parent]);
          });
      });
    },

    writeData: function(data) {
      var notebookPath  = generateNotebookFilePath.call(this);
      var git           = new Git(Path.dirname(notebookPath));
      var self          = this;

      return writeFile(notebookPath, RDWR_EXCL, data)
      .then(git.init.bind(git), function(e) {
        console.log("* A notebook with '" + self.get('name') + "' name already exists within this project");
        return self.addCommit(data);
      })
      .then(git.addToIndex.bind(git, [Path.basename(notebookPath)]))
      .then(function(oid) {
        return git.commit(oid, []);
      }).then(function() {
        return self;
      });
    },

    _commitData: function(d, options) {
      if (options.patch && !d.data) {
        return;
      }

      return this.getData(d.data)
      .then(_.bind(function(data) {
        if (!data) {
          throw new Error('Invalid notebook format for '+ this.get('name') +' , the data attribute is required');
        }
        delete this.attributes.data;

        return this.writeData(data);
      }, this));
    },

    save: function(attributes, options) {
      var args        = arguments;
      var self        = this;
      var options     = options || {};
      var attributes  = attributes || {};

      // Remove data attribute from model instance since
      // we do not want to save it
      attributes.data = attributes.data || _.cloneDeep(this.attributes.data);
      delete this.attributes.data;

      return Bookshelf.Model.prototype.save.call(
        self,
        _.omit(attributes, 'data'),
        options
      )
      .then(function() {
        return self._commitData(attributes, options);
      })
      .then(function() {
        return self;
      });
    }
  });

  Notebook.getOpen = function(opts) {
    return query("Notebooks")
    .where("userId", opts.userId)
    .where("open", true)
    .select();
  },

  Notebook.list = function(opts) {
    return query("Notebooks")
    .where("projectId", opts.projectId)
    .select()
    .then(function(notebooks) {
      return when.map(notebooks, function(notebook) {
        return addCommitCount(Notebook.forge(notebook))
      });
    });
  };

  Notebook.load = function(opts) {
    return Notebook.forge(opts).fetch().then(function(notebook) {
      return readFile(generateNotebookFilePath.call(notebook)).then(function(data) {
        return _.extend(notebook.attributes, {data: data});
      });
    });
  }

  Notebook.generateNotebookFilePath = generateNotebookFilePath;

  return {
    model: Notebook,
    name: "Notebook"
  }
}

module.exports = Notebook;
