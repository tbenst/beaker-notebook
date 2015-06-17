var moment = require('moment');
var bluebird = require('bluebird');
var notebookBase = require('../fixtures/notebook_data_sample');
var _ = require('lodash');

module.exports = function() {
  var n = this.notebook;
  var u = this.user;
  var _this = this;

  function otherUser() {
    return {
      'name': 'john smith',
      'email': 'r' + _this.numUsers + '@u.edu',
      'password': 'password',
      'job-title': 'Dev',
      'company': 'Two Sigma',
      'bio': 'Keeping these parts safe'
    };
  }

  function seedCategory(name) {
    if (name) {
      return bluebird.resolve(_this.currentCategories[name]);
    } else {
      return n.createCategory({name: 'test category'});
    }
  }

  function seedPublications(count, names) {
    names = names || {};
    return seedCategory(names.category)
    .then(function(cat) {
      return n.createProject({name: names.project || 'test', description: 'test'})
      .then(function(p) {
        return Promise.resolve(_.range(count))
        .each(function(i) {
          return n.createNotebook(p['public-id'], {name: names.notebook || 'test notebook ' + i})
          .then(function(nb) {
            return n.createPublication({
              'notebook-id': nb['public-id'],
              'name': names.publication || 'test publication ' + i,
              'categoryID': cat['public-id']
            });
          });
        });
      });
    });
  }

  function seedPublicationsAsOtherUser(count, names) {
    names = names || {};
    _this.numUsers = _this.numUsers || 0;

    return u.createUser(otherUser())
    .then(function(user) {
      _this.numUsers += 1;
      return seedCategory(names.category)
      .then(function(cat) {
        return n.seedProject({
          'owner-id': user['public-id'],
          'name': names.project || 'test', description: 'test'
        })
        .then(function(p) {
          return Promise.resolve(_.range(count))
          .each(function(i) {
            return n.seedNotebook({
              'project-id': p['public-id'],
              'user-id': user['public-id'],
              'name': names.notebook || 'test notebook ' + i
            })
            .then(function(nb) {
              return n.seedPublication({
                'author-id': user['public-id'],
                'notebook-id': nb['public-id'],
                'name': names.publication || 'test publication ' + i,
                'categoryID': cat['public-id']
              });
            });
          });
        });
      });
    });
  }

  this.Given(/^there are (\d+) publications(?: for the project "([^"]*)")?$/, function(count, projectName) {
    return seedPublicationsAsOtherUser(count, {project: projectName});
  });

  this.Given(/^there are (\d+) publications in the "([^"]*)" category$/, function(count, categoryName) {
    return seedPublicationsAsOtherUser(count, {category: categoryName});
  });

  this.Given(/^I have a publication$/, function() {
    return seedPublications(1);
  });

  this.Given(/^the notebook "([^"]*)" is published$/, function(name) {
    var notebook = this.currentNotebooks[name];
    var category = this.currentCategory;
    return n.createPublication(
      {"name": name,
       "description": "some published notebook",
       "notebook-id": notebook["public-id"],
       "categoryID": category['public-id']
      });
  });

  this.Given(/^there is a publication named "([^"]*)"$/, function(name) {
    return seedPublications(1, {publication: name, notebook: name});
  });

  function categoryAttrs(attrs) {
    var base = {
      ":category/name": "Finance",
      ":category/description": "Finance stuff"
    };
    return _.merge(base, attrs);
  }

  this.Given(/^I have the following(?: Beaker)? publication categories:$/, function(table) {
    var _this = this;
    return Promise.resolve(table.hashes())
    .each(function(row) {
      var attrs = _.object(_.map(row, function (val, key) {
        return [key, val];
      }));
      return n.createCategory(categoryAttrs(attrs))
      .then(function (category) {
        _this.currentCategory = category;
        _this.currentCategories = _this.currentCategories || {};
        _this.currentCategories[category.name] = category;
        return category;
      });
    });
  });

  function waitforPublicationList() {
    return this.driver.wait(function() {
      return new this.Widgets.PublicationList().length()
      .then(function(n) {return n > 0});
    }.bind(this), 10000, 'Found no publications');
  }

  this.When(/^I view the publication$/, function() {
    var _this = this;

    return new this.Widgets.MainNav().visitPublications()
    .then(function() {
      return waitforPublicationList.bind(_this)();
    })
    .then(function() {
      return new _this.Widgets.PublicationList().clickAt({selector: 'a.title', index: 0});
    });
  });

  this.Given(/^I view the first publication$/, function() {
    return waitforPublicationList.bind(this)()
    .then(function() {
      return new this.Widgets.PublicationList()
      .clickAt({selector: 'a.title', index: 0});
    }.bind(this));
  });

  this.When(/^I view the publications page$/, function() {
    return new this.Widgets.MainNav().visitPublications();
  });

  this.When(/^I wait for publications to load$/, function() {
    return waitforPublicationList.bind(this)();
  });

  this.When(/^I click the "([^"]*)" category$/, function(category) {
    return new this.Widgets.PublicationCategoriesList().clickCategory(category);
  });

  this.Then(/^The category should display the "([^"]*)" icon$/, function(category) {
    return new this.Widgets.PublicationCategoryHero().icon().should.eventually.eql(category);
  });

  this.Then(/^The category should have the description "([^"]*)"$/, function(description) {
    return new this.Widgets.PublicationCategoryHero().description().should.eventually.equal(description);
  });

  this.When(/^I go to publish the notebook$/, function() {
    return new this.Widgets.Notebook().openPublishModal();
  });

  this.When(/^I give it the description "([^"]*)"$/, function(description) {
    return new this.Widgets.PublishModal().addDescription(description);
  });

  this.Then(/^I should see "([^"]*)"$/, function(msg) {
    return new this.Widgets.PublishModal().find({text: msg});
  });

  this.When(/^I give it the category "([^"]*)"$/, function(category) {
    return new this.Widgets.PublishModal().selectCategory(category);
  });

  this.When(/^I publish the notebook|update the publication$/, function() {
    return new this.Widgets.PublishModal().publish();
  });

  this.When(/^I view the published version$/, function() {
    return new this.Widgets.Notebook().viewPublished();
  });

  this.When(/^I go to update the publication$/, function(callback) {
    return new this.Widgets.Notebook().goToUpdatePublication();
  });

  this.When(/^I delete the publication$/, function() {
    return new this.Widgets.Notebook().removePublication();
  });

  this.When(/^I go to open the publication in Bunsen$/, function() {
    return new this.Widgets.Publication().goToOpenInBunsen();
  });

  this.When(/^I select the destination project "([^"]*)"$/, function(project) {
    return new this.Widgets.copyNotebookModal().selectProject(project);
  });

  this.When(/^I name the copied notebook "([^"]*)"$/, function(name) {
    return new this.Widgets.copyNotebookModal().nameNotebook(name);
  });

  this.When(/^I copy the publication$/, function() {
    return new this.Widgets.Modal().submit();
  });

  this.Then(/^I should see a published version of the following notebook:$/, function(table) {
    var attrs = table.hashes()[0];
    var publication = new this.Widgets.Publication();

    return publication.name().should.eventually.eql(attrs.name)
    .then(function() {
      return publication.description().should.eventually.eql(attrs.description);
    });
  });

  this.Then(/^I should see an updated version of the following notebook:$/, function(table) {
    var attrs = table.hashes()[0];
    var publication = new this.Widgets.Publication();

    return publication.name().should.eventually.eql(attrs.name)
    .then(function() {
      return publication.description().should.eventually.eql(attrs.description);
    });
  });

  this.Then(/^I should see that the notebook is not published$/, function() {
    return new this.Widgets.Notebook().isPrivate();
  });

  this.When(/^I should see that the notebook is published$/, function() {
    return new this.Widgets.Notebook().isPublic();
  });

  this.Then(/^the notebook updated time should be now$/, function(callback) {
    return new this.Widgets.Notebook().updateTime().then(function(publishTime) {
      var formattedPublishTime = moment(publishTime, 'M/D/YY h:mm A');
      var now = moment();
      return now.diff(formattedPublishTime, 'minutes').should.be.at.most(1);
    });
  });

  this.Then(/^the notebook publish date should be now$/, function() {
    return new this.Widgets.Notebook().publishTime().then(function(publishTime) {
      var formattedPublishTime = moment(publishTime, 'M/D/YY h:mm A');
      var now = moment();
      return now.diff(formattedPublishTime, 'minutes').should.be.at.most(1);
    });
  });

  this.Then(/^the notebook cells should be visible$/, function() {
    var _this = this;
    return new this.Widgets.Notebook().waitForBeaker().then(function() {
      return new _this.Widgets.NotebookiFrames().hasVisible().should.eventually.eql(true);
    });
  });

  this.Then(/^I should see (\d+) publication results on the page$/, function(count) {
    var found = -1;
    return this.driver.wait(function() {
      return new this.Widgets.PublicationList().length()
      .then(function(num) {
        found = num;
        return num == count;
      });
    }.bind(this), 30000, 'Found ' + found + ' results, expected ' + count);
  });

  this.Then(/^I should see the "([^"]*)" icon in the first result$/, function(category) {
    return new this.Widgets.PublicationList().at(0).then(function(publication) {
      return publication.icon().should.eventually.eql(category);
    });
  });

  this.Then(/^I should see (\d+) publication results next to the "([^"]*)" category$/, function(n, category) {
    return new this.Widgets.PublicationCategoriesList().count(category).should.eventually.eql(n);
  });

  this.Then(/^I should see the following publication first in the list:$/, function(table) {
    return new this.Widgets.PublicationList().at(0).then(function(publication) {
      return publication.name().should.eventually.eql(_.pluck(table.hashes(), 'name')[0])
      .then(function() {
        var languages = _.pluck(table.hashes(), 'languages')[0];
        return !languages || publication.languages().should.eventually.eql(languages);
      });
    });
  });

  this.Then(/^I should see my author info in the first publication$/, function() {
    return new this.Widgets.PublicationList().at(0).then(function(publication) {
      return publication.author().should.eventually.equal('joe research')
      .then(function() {
        return publication.authorJobTitle().should.eventually.contain('Researcher');
      })
      .then(function() {
        return publication.authorCompany().should.eventually.equal('Two Sigma');
      });
    });
  });

  this.Then(/^I should see an average rating of (\d+) in the first publication$/, function(avg) {
    return new this.Widgets.UserRating({root: '.average'}).currentRating().should.eventually.have.length(avg);
  });

  this.Then(/^I should see the following top contributors:$/, function(table) {
    var expectedValues = table.hashes();
    return new this.Widgets.TopContributorList().contents().should.eventually.eql(expectedValues);
  });

  this.When(/^I search for publication "([^"]*)"$/, function(searchText) {
    var publicationSearch = new this.Widgets.PublicationSearch();
    return publicationSearch.search(searchText);
  });

  this.Then(/^I should be on page (\d+) of results$/, function(page) {
    var currentPage = -1;
    return this.driver.wait(function() {
      return new this.Widgets.PublicationsPagination().currentPage()
      .then(function(p) {
        currentPage = p;
        return p == page;
      });
    }.bind(this), 30000, 'expected to be on page ' + page + ', instead was on ' + currentPage);
  });

  this.When(/^I click page (\d+) of pagination$/, function(page) {
    return new this.Widgets.PublicationsPagination().clickPage(page);
  });

  this.Then(/^I give the publication a rating of (\d+)$/, function(index) {
    return new this.Widgets.UserRating({root: '.rating'}).clickStar(index);
  });

  this.Then(/^I should see (\d+) stars highlighted in my rate$/, function(count) {
    return new this.Widgets.UserRating({root: '.rating'}).currentRating().should.eventually.have.length(count);
  });

  this.Then(/^I should see (\d+) stars highlighted in the average$/, function(count) {
    return new this.Widgets.UserRating({root: '.average'}).currentRating().should.eventually.have.length(count);
  });
};
