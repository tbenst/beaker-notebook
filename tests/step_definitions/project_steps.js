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
    var projectData = _.cloneDeep(projectBase);

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

  this.Then(/^I should see (\d+) project results\.$/, function (expectedCount) {
    var projectSearch = new this.Widgets.ProjectSearch;
    return projectSearch.getCount().then(function(count) {
      assert.equal(expectedCount, count);
    });
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

    return this.seed(seed);
  });

  this.Given(/^I view the first search result$/, function(index) {
    var projectSearch = new this.Widgets.ProjectSearchList;
    return projectSearch.click(0);
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

  this.When(/^I open the "([^"]*)" project$/, function(name) {
    var projectManager = new this.Widgets.ProjectManager();
    return projectManager.clickProject(name);
  });

  this.Then(/^I should see the description "([^"]*)"$/, function(description, callback) {
    var projectDetail = new this.Widgets.ProjectDetail();
    return projectDetail.description().should.eventually.equal(description);
  });

  this.Then(/^I should see last updated as todays date$/, function(callback) {
    var projectDetail = new this.Widgets.ProjectDetail();

    return projectDetail.updatedAt().should.eventually.contain(moment().format("M/DD/YY"));
  });
}
