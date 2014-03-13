var ngit = require('nodegit'),
    when = require('when'),
    path = require('path'),
    nodefn = require("when/node/function"),
    _ = require('lodash');

function Git(path) {
  _.extend(this, {
    path: path,
    author: 'Bunsen',
    email: 'bunsen@example.com'
  });
}

_.extend(Git.prototype, {
  init: function() {
    var self = this;
    return nodefn.call(ngit.Repo.init, this.path, false)
      .then(function(repo) {
        self.repo = repo;
        return repo;
      });
  },

  open: function() {
    var self = this;
    return nodefn.call(ngit.Repo.open, path.join(this.path, '/.git'))
      .then(function(repo) {
        self.repo = repo;
        return repo;
      });
  },

  addToIndex: function(paths) {
    return nodefn.call(this.repo.openIndex.bind(this.repo))
      .then(function(index) {
        return nodefn.call(index.read.bind(index))
          .then(function() {
            return when.map(paths, function(filePath) {
              return nodefn.call(index.addByPath.bind(index), filePath);
            });
          })
          .then(function() {
            return nodefn.call(index.write.bind(index));
          })
          .then(function() {
            return nodefn.call(index.writeTree.bind(index));
          });
      });
  },

  head: function() {
    var self = this;
    return nodefn.call(ngit.Reference.oidForName, this.repo, 'HEAD')
      .then(function(head) {
        return nodefn.call(self.repo.getCommit.bind(self.repo), head);
      });
  },

  commit: function(oid, parent) {
    var author = ngit.Signature.create(this.author, this.email, 123456789, 60);
    var committer = ngit.Signature.create(this.author, this.email, 987654321, 90);
    return nodefn.call(this.repo.createCommit.bind(this.repo), 'HEAD', author, committer, 'Saved Beaker notebook', oid, parent)
      .then(function(commitId) {
        console.log("New Commit:", commitId.sha());
      });
  }
});


module.exports = Git;
