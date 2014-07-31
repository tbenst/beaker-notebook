var moment = require('moment');
var bluebird = require('bluebird');
var notebookBase = require('../fixtures/notebook_data_sample');

var randomUser = {
  model: "User",
  data: {
    name: 'jane research',
    email: 'j@r.edu'
  }
};

var randomProject = function(user) {
  return {
    model: "Project",
    data: {
      name: 'gorillas',
      ownerId: user.id
    }
  }
};

var randomNotebook = function(user, project, i) {
  return {
    model: "Notebook",
    data: _.extend(_.omit(notebookBase, ['userEmail', 'projectName']), {
      name: "Notebook " + i,
      userId: user.id,
      projectId: project.id
    })
  }
};

module.exports = function() {
  this.Given(/^there are (\d+) publications$/, function(count) {
    return this.seed.populate(randomUser).then(function(user) {
      return this.seed.populate(randomProject(user)).then(function(project) {
        var notebooks = [];

        for(var i = 0; i < +count; ++i) {
          notebooks.push(randomNotebook(user, project, i));
        }

        return this.seed.populate(notebooks)
          .then(function(notebooks) {
            var publicationPromises = [];

            _.each(notebooks, function(notebook) {
              publicationPromise = this.seed.populate({
                model: "Publication",
                data: {
                  notebook_id: notebook.id,
                  contents: notebookBase.data
                }
              });

              publicationPromises.push(publicationPromise);
            }.bind(this));

            return publicationPromises;
          }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  this.Given(/^the notebook "([^"]*)" is published$/, function(notebookName) {
    return this.seed.populate({
      model: 'Publication',
      associations: [{
        foreignKey: 'notebook_id',
        lookup: {"Notebook": {name: notebookName}}
      }]
    });
  });

  this.When(/^I view the publications page$/, function() {
    return this.driver.get(this.route.publications);
  });

  this.When(/^I go to publish the notebook$/, function() {
    return new this.Widgets.Notebook().openPublishModal();
  });

  this.When(/^I give it the description "([^"]*)"$/, function(description) {
    return new this.Widgets.PublishModal().addDescription(description)
  });

  this.When(/^I publish the notebook$/, function() {
    return new this.Widgets.PublishModal().publish();
  });

  this.When(/^I view the published version$/, function() {
    return new this.Widgets.Notebook().viewPublished();
  });

  this.When(/^I delete the publication$/, function() {
    return new this.Widgets.Notebook().removePublication();
  });

  this.Then(/^I should see a published version of the following notebook:$/, function(table) {
    var attrs = table.hashes()[0];
    var publication = new this.Widgets.Publication();

    return publication.name().should.eventually.eql(attrs.name)
    .then(function() {
      return publication.description().should.eventually.eql(attrs.description);
    })
  });

  this.Then(/^I should see that the notebook is not published$/, function() {
    return new this.Widgets.Notebook().publishStatus().should.eventually.eql('This notebook is currently private');
  });

  this.Then(/^I should see that the notebook is published$/, function() {
    return new this.Widgets.Notebook().publishStatus().should.eventually.eql('This notebook is published');
  });

  this.Then(/^the notebook publish date should be now$/, function() {
    return new this.Widgets.Notebook().publishTime().then(function(publishTime) {
      var publishTime = moment(publishTime, "M/D/YY h:mm A");
      var now = moment();
      return now.diff(publishTime, 'minutes').should.be.at.most(1);
    });
  });

  this.Then(/^I should see (\d+) publication results on the page$/, function(count) {
    return new this.Widgets.PublicationList().items().should.eventually.have.length(count);
  });

  this.Then(/^I should see the following publication first in the list:$/, function(table) {
    return new this.Widgets.PublicationList().at(0).then(function(publication) {
      return publication.name().should.eventually.eql(_.pluck(table.hashes(), 'name')[0]);
    });
  });
}
