var Git         = require("../lib/notebook/git"),
    Path        = require('path'),
    fs          = require('fs'),
    cnst        = require('constants'),
    nodefn      = require("when/node/function"),
    mkdirp      = require("mkdirp"),
    when        = require('when'),
    _           = require("lodash"),
    EXTENSION   = ".bkr",
    MAX_RECENT_NOTEBOOKS = 5,

    RecordNotUniqueError = require("../lib/record_not_unique_error");

var UNIQUE_VIOLATION_ERROR = 23505; // Postgresql error codes: www.postgresql.org/docs/9.1/static/errcodes-appendix.html

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

function calculateNotebookName(names, baseName) {
  var filter = new RegExp(baseName + " (\d+)")
  names = names.concat({name: baseName+0});

  return baseName +
  (_(names).pluck("name")
  .filter(filter.match)
  .map(function(v) {
    return +v.split(baseName)[1]
  })
  .max()
  .value()+1);
}

function Notebook(Bookshelf, app) {
  var models  = app.Models;
  var query   = Bookshelf.knex;

  var Notebook = Bookshelf.Model.extend({
    tableName: "notebooks",

    idAttrs: ["name", "projectId"],

    initialize: function() {
      this.on("saving", this.ensureName);
    },

    publication: function() {
      return this.hasOne(app.Models.Publication, 'notebook_id');
    },

    category: function() {
      return this.belongsTo(app.Models.Category, 'notebook_id');
    },

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
      .then(function() {
        return git.init()
        .then(git.init.bind(git))
        .then(git.addToIndex.bind(git, [Path.basename(notebookPath)]))
        .then(function(oid) {
          return git.commit(oid, []);
        }).then(function() {
          return self;
        });
      }, function(e) {
        return self.addCommit(data);
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

    ensureName: function() {
      if (!this.get("name")) {
        return query('notebooks')
        .where("userId", this.get("userId"))
        .column('name')
        .then(_.partialRight(calculateNotebookName, "Notebook "))
        .then(_.bind(function(name) {
          return this.set('name', name);
        }, this));
      }

      return when(true);
    },

    withData: function() {
      var _this = this;
      return readFile(generateNotebookFilePath.call(this)).then(function(data) {
        _.extend(_this.attributes, {data: data});
        return _this;
      });
    },

    saveUnique: function(attributes, options) {
      return this.save(attributes, options)
        .catch(function(e) {
          if (e.clientError && e.clientError.cause.code == UNIQUE_VIOLATION_ERROR) {
            throw new RecordNotUniqueError();
          }
          throw e;
        });
    },

    save: function(attributes, options) {
      var self        = this;
      var options     = options || {};
      var attributes  = attributes || {};

      // Remove data attribute from model instance since
      // we do not want to save it
      attributes.data = attributes.data || _.cloneDeep(self.attributes.data);
      delete self.attributes.data;

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

  Notebook.list = function(opts) {
    return query("notebooks")
    .where("projectId", opts.projectId)
    .select()
    .orderBy('name', 'ASC')
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
