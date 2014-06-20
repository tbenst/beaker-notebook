var _         = require("lodash");
var Promise   = require("bluebird");
var assert    = require("assert");

var notebookBase = function() {
  return require("../fixtures/notebook_data_sample");
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

      return Promise.all([
        _this.seed.fetch("User", {email: attrs.userEmail}),
        _this.seed.fetch("Project", {name: attrs.projectName})
      ]).spread(function(user, project) {
        return _this.seed.populate({
          model: "Notebook",
          data: _.extend(
            notebookBase(),
            _.omit(attrs, ['userEmail', 'projectName']),
            {
              userId: JSON.parse(user[1]).id,
              projectId: JSON.parse(project[1]).id
            }
          )
        });
      });
    });
  });

  this.Given(/^I open the rename modal for "([^"]*)"$/, function(notebook) {
    return new this.Widgets.NotebookList().openRenameModal(notebook);
  });

  this.When(/^I click the modal close button$/, function() {
    return new this.Widgets.Modal().close();
  });

  this.Then(/^the modal should be closed$/, function() {
    return new this.Widgets.Modal().isDisplayed().should.eventually.be.false;
  });

  this.Then(/^I should see the following open notebooks:$/, function(table, callback) {
    var expected = _.pluck(table.hashes(), 'name');
    return Promise.delay(1000).then(function() {
      return (new this.Widgets.OpenNotebookList).getNames().then(function(names) {
        return assert.deepEqual(names, expected);
      });
    }.bind(this));
  });

  this.When(/^I close the open notebook "([^"]*)"$/, function(name) {
    return (new this.Widgets.OpenNotebookList()).closeNotebook(name);
  });

  this.Then(/^I should see the following notebooks$/, function(table, callback) {
    var expected = _.pluck(table.hashes(), 'name');

    return (new this.Widgets.NotebookList).getNames().should.eventually.deep.equal(expected);
  });

  this.When(/^I close the notebook$/, function(callback) {
    var _this = this;
    return (new this.Widgets.Notebook()).close().then(function() {
      return (new _this.Widgets.ProjectDetail).find();
    });
  });

  this.When(/^I import the notebook by uploading the "([^"]*)" file$/, function(file) {
    var importWidget = new this.Widgets.ImportNotebooks();
    return importWidget.startImport().then(function() {
      return importWidget.attachFile(file);
    })
  });

  this.When(/^I move the "([^"]*)" notebook to the "([^"]*)" project$/, function(n, p) {
    var _this = this;
    var notebookList = new this.Widgets.NotebookList();
    return notebookList.move(n)
      .then(function() {
        return (new _this.Widgets.ProjectSelector).clickByName(p);
      });
  });

  this.When(/^I rename the "([^"]*)" notebook to "([^"]*)"$/, function(notebook, newName) {
    var notebookList = new this.Widgets.NotebookList();
    return notebookList.openModalAndRename(notebook, newName);
  });

  this.When(/^I rename the notebook to "([^"]*)"$/, function(newName) {
    return new this.Widgets.Notebook().openModalAndRename(newName);
  });

  this.When(/^I rename the notebook "([^"]*)" instead$/, function(newName) {
    return new this.Widgets.NotebookList().rename(newName);
  });

  this.Then(/^I shouldn't see an error in the modal$/, function(callback) {
    return new this.Widgets.Modal().errorMessage().should.eventually.equal('');
  });

  this.Then(/^I should see the error: "([^"]*)"$/, function(e) {
    return (new this.Widgets.Error).getMessage().should.eventually.equal(e);
  });

  this.When(/^I make a new notebook$/, function() {
    return (new this.Widgets.ProjectDetail()).addNewNotebook();
  });

  this.When(/^I save the notebook as "([^"]*)"$/, function(name) {
    return (new this.Widgets.BeakerFrame()).saveAs(name);
  });

  this.Then(/^I should be in the "([^"]*)" notebook$/, function(name) {
    return new this.Widgets.Notebook().name().should.eventually.equal(name);
  });

  this.Then(/^I should see an error in the modal saying "([^"]*)"$/, function(error) {
    return new this.Widgets.Modal().errorMessage().should.eventually.equal(error);
  });

  this.When(/^I save my changes to the notebook$/, function() {
    return (new this.Widgets.BeakerFrame()).saveChanges();
  });

  this.When(/^I open the recent notebook "([^"]*)"$/, function(name) {
    return (new this.Widgets.RecentNotebooks()).clickItem(name);
  });

}
