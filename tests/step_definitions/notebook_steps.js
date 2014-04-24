var _         = require("lodash");
var Promise   = require("bluebird");
var assert    = require("assert");

var notebookBase = function() {
  return require("../../app/seed_files/notebook_data_sample2");
}

module.exports = function() {
  this.When(/^I view the notebook "([^"]*)"$/, function(notebookName) {
    var notebookList = new this.Widgets.NotebookList();
    return notebookList.clickByName(notebookName);
  });

  this.Then(/^I should see the following recent notebooks:$/, function(table) {
    var recentNotebooks = new this.Widgets.RecentNotebooks();

    return recentNotebooks.getNames().then(function(recent) {
      return assert.deepEqual(recent, table.hashes().map(function(n) {
        return n.name;
      }));
    });
  });

  this.Given(/^I have the following notebooks:$/, function(notebooks) {
    var _this = this;

    return Promise.map(notebooks.hashes(), function(attrs) {
      attrs.userEmail = attrs.userEmail || "u@r.edu";

      return Promise.all([ _this.Models.User.forge({email: attrs.userEmail}).fetch(),
        _this.Models.Project.forge({name: attrs.projectName}).fetch()
      ]).spread(function(user, project) {
        return (new _this.Models.Notebook).save(_.extend(notebookBase(), attrs, {
          userId: user.id,
          projectId: project.id
        }, {relativeRoot: "../app"}));
      });
    });
  });

  this.Then(/^I should see the following open notebooks:$/, function(table, callback) {
    var expected = _.pluck(table.hashes(), 'name');

    return (new this.Widgets.OpenNotebookList).getNames().should.eventually.deep.equal(expected);
  });

  this.Then(/^I should see the following notebooks$/, function(table, callback) {
    var expected = _.pluck(table.hashes(), 'name');

    return (new this.Widgets.NotebookList).getNames().should.eventually.deep.equal(expected);
  });

  this.When(/^I close the notebook$/, function(callback) {
    return (new this.Widgets.Notebook()).close();
  });
}
