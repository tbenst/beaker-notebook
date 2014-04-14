var assert = require("assert");

module.exports = function() {

  this.When(/^I create a project$/, function() {
    var mainNav = new this.Widgets.MainNav();
    var _this   = this;
    return mainNav.visitProjects().then(function() {
      return new _this.Widgets.ProjectManager().createNew();
    });
  });

  this.Then(/^I should see a new project in my list$/, function() {
    var projects = new this.Widgets.ProjectManager();
    projects.waitForItem();
    projects.items().should.eventually.have.length(1);
  });

  this.When(/^I open the project$/, function() {
    var projectManager = new this.Widgets.ProjectManager();

    return projectManager.items()
    .then(function(items) {
      return items[0].click();
    });
  });

  this.Then(/^I should see the project detail page$/, function() {
    var projectDetail = new this.Widgets.ProjectDetail();

    return projectDetail.isPresent().should.eventually.equal(true);
  });

  this.Given(/^I'm looking at a project$/, function() {
    var _this       = this;
    var projectData = {
      model: "Project",
      data: {
        name: 'My Project',
        description: 'desc'
      },
      associations: [
        {
          foreignKey: "ownerId",
          lookup: {
            User: {email: "u@r.edu"}
          }
        }
      ]
    };

    return this.seed(projectData).then(function(Models) {
      return Models.Project.forge(projectData.data)
      .fetch()
      .then(function(project) {
        return _this.driver.get(_this.route.forProject(project));
      });
    }.bind(this));
  });

  this.When(/^I edit the project$/, function() {
    return new this.Widgets.ProjectDetail().edit();
  });

  this.When(/^I update the project as follows:$/, function(table) {
    return new this.Widgets.ProjectForm().submitWith(table.hashes()[0]);
  });

  this.Then(/^I should see that the project details are:$/, function(table) {
    var deets = table.hashes()[0];
    var projectDetailWidget = new this.Widgets.ProjectDetail();
    projectDetailWidget.name().should.eventually.equal(deets.name);
    return projectDetailWidget.description().should.eventually.equal(deets.description);
  });

  this.When(/^I delete the project$/, function(table) {
    return new this.Widgets.ProjectForm().delete();
  });

  this.When(/^I should see that I have no projects in my list$/, function(table) {
    return new this.Widgets.ProjectManager().items().should.eventually.have.length(0);
  });

  this.Given(/^I am viewing the project dashboard$/, function() {
    return this.driver.get(this.route.projectDashboard);
  });

  this.When(/^I search for project "([^"]*)"$/, function (searchText) {
    var projectSearch = new this.Widgets.ProjectSearch;
    return projectSearch.search(searchText);
  });

  this.Then(/^I should see "([^"]*)" project results\.$/, function (expectedCount) {
    var projectSearch = new this.Widgets.ProjectSearch;
    return projectSearch.getCount().then(function(count) {
      assert.equal(expectedCount, count);
    });
  });
}
