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
        return _this.Models.Notebook.forge(
          _.extend(notebookBase(), _.omit(attrs, ['projectName', 'userEmail']), {
            userId: user.id,
            projectId: project.id
          })
        )
        .save({}, {relativeRoot: "../app"});
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

  this.Then(/^I should see the following notebooks in the gutter:$/, function(table, callback) {
    var expected = _.pluck(table.hashes(), 'name');

    return (new this.Widgets.NotebookGutterList).getNames().should.eventually.deep.equal(expected);
  });

  this.When(/^I close the notebook$/, function(callback) {
    var _this = this;
    return (new this.Widgets.Notebook()).close().then(function() {
      return (new _this.Widgets.ProjectDetail).find();
    });
  });

  this.When(/^I import the notebook by uploading the "([^"]*)" file$/, function(file) {
    var importWidget = new this.Widgets.ImportNotebooks();
    return importWidget.import().then(function() {
      return importWidget.attachFile("hello_world.bkr")
    })
  });

  this.When(/^I make a new notebook$/, function() {
    return (new this.Widgets.ProjectDetail()).addNewNotebook();
  });

  this.When(/^I save the notebook as "([^"]*)"$/, function(name) {
    return (new this.Widgets.BeakerFrame()).saveAs(name);
  });

  this.When(/^I save my changes to the notebook$/, function() {
    return (new this.Widgets.BeakerFrame()).saveChanges();
  });

}
