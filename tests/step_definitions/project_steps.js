var assert      = require("assert");
var moment      = require("moment");
var _           = require("lodash");
var projectBase = {
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

function openProject(name) {
  var projectManager = new this.Widgets.ProjectManager();
  return projectManager.clickProject(name);
}

function viewProjectDashboard() {
  var mainNav = new this.Widgets.MainNav();
  return mainNav.visitMarketPlace().then(function() {
    return mainNav.visitProjects();
  });
}

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

    return projects.waitForItem()
    .then(function() {
      return projects.items().should.eventually.have.length(2);
    })
  });

  this.When(/^I open the project$/, function() {
    var projectManager = new this.Widgets.ProjectManager();

    return projectManager.at(0).then(function(item) {
      item.click();
    });
  });

  this.Then(/^I should see the project detail page$/, function() {
    var projectDetail = new this.Widgets.ProjectDetail();

    return projectDetail.isPresent().should.eventually.equal(true);
  });

  this.Given(/^I'm looking at a project$/, function() {
    var _this       = this;
    var projectData = _.cloneDeep(projectBase);

    return this.seed.populate(projectData)
    .then(function() {
      return viewProjectDashboard.call(_this).then(function() {
        return openProject.call(_this, projectData.data.name);
      })
    });
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

  this.When(/^I go to delete the project$/, function() {
    return new this.Widgets.ProjectForm().goToDelete();
  });

  this.When(/^I should see that I have one project in my list$/, function(table) {
    return new this.Widgets.ProjectManager().items().should.eventually.have.length(1);
  });

  this.Given(/^I am viewing the project dashboard$/, viewProjectDashboard);

  this.When(/^I cancel deleting the project$/, function(callback) {
    return new this.Widgets.Modal().cancel();
  });

  this.Then(/^I should still be on the project page$/, function() {
    return new this.Widgets.ProjectDetail().isPresent().should.eventually.be.true;
  });

  this.Then(/^I should see that I have (\d+) project(s)? in my list$/, function(count) {
    return new this.Widgets.ProjectManager().items().should.eventually.have.length(count);
  });

  this.When(/^I search for project "([^"]*)"$/, function (searchText) {
    var projectSearch = new this.Widgets.ProjectSearch;
    return projectSearch.search(searchText);
  });

  this.Then(/^I should see (\d+) project results\.$/, function (expectedCount) {
    var projectSearch = new this.Widgets.ProjectSearch;
    return projectSearch.getCount().then(function(count) {
      assert.equal(expectedCount, count);
    });
  });

  this.Then(/^I should see the following project list in the sidebar:$/, function(table) {
    var expected = _.pluck(table.hashes(), 'name');
    return new this.Widgets.SidebarProjectList().itemNames().should.eventually.eql(expected);
  });

  this.Then(/^I should see the following project list:$/, function(table) {
    var projectManager = new this.Widgets.ProjectManager();
    var expected = _.map(table.rows(), function(r) {return r[0]});
    return projectManager.itemNames().should.eventually.deep.equal(expected);
  });

  this.Given(/^I have the following Projects:$/, function(table) {
    var seed = _(table.hashes()).map(function(attrs) {
        return _.merge(_.cloneDeep(projectBase), {
          data: attrs
        });
      }).value();

    return this.seed.populate(seed);
  });

  this.Given(/^I view the first search result$/, function(index) {
    var projectSearch = new this.Widgets.ProjectSearchList;
    return projectSearch.at(0).then(function(item) {
      item.click();
    })
  });

  this.Given(/^I view my projects$/, function() {
    var _this = this;
    // This step is meant to always refresh the projects view (which is a default view after signing in)
    return new this.Widgets.MainNav().visitMarketPlace()
      .then(function() {
        var mainNav = new _this.Widgets.MainNav();
        return mainNav.visitProjects()
      })
      .then(function() {
        var projectDetail = new _this.Widgets.ProjectDetail();
        return projectDetail.name().should.eventually.exist;
      });
  });

  this.When(/^I go to my projects$/, function() {
    var _this = this;
    // This step is meant to always refresh the projects view (which is a default view after signing in)
    return new this.Widgets.MainNav().visitMarketPlace()
      .then(function() {
        var mainNav = new _this.Widgets.MainNav();
        return mainNav.visitProjects()
      });
  });

  this.Then(/^I should see the "([^"]*)" project detail page$/, function(name) {
    var projectDetail = new this.Widgets.ProjectDetail();
    return projectDetail.name().should.eventually.equal(name);
  });

  this.When(/^I open the "([^"]*)" project$/, openProject);

  this.Then(/^I should see the description "([^"]*)"$/, function(description, callback) {
    var projectDetail = new this.Widgets.ProjectDetail();
    return projectDetail.description().should.eventually.equal(description);
  });

  this.Then(/^I should see last updated as today's date$/, function(callback) {
    var projectDetail = new this.Widgets.ProjectDetail();
    return projectDetail.updatedAt().should.eventually.contain(moment().format("M/D/YY h:mm A"));
  });

  this.Then(/^I should see the following project results$/, function(table) {
    return new this.Widgets.ProjectSearchList().contents().should.eventually.eql(table.hashes());
  });

  this.Then(/^I should be warned that the project is a duplicate name$/, function(callback) {
    var projectDetail = new this.Widgets.ProjectDetail();
    return projectDetail.error().should.eventually.contain("already have a project named");
  });

  this.When(/^I dismiss the duplicate project name error message$/, function() {
    return new this.Widgets.ProjectDetail().dismissError();
  });

  this.Then(/^I should not see the project duplicate warning$/, function() {
    return new this.Widgets.ProjectDetail().error().should.eventually.contain("");
  });

  this.Then(/^I should see the following recently used notebooks:$/, function(table) {
    var expectedTitles = _.pluck(table.hashes(), 'name');

    return new this.Widgets.Overview().recentlyUsedTitles().should.eventually.eql(expectedTitles);
  });
}
