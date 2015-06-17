module.exports = function() {
  this.When(/^I delete the publication from publication page$/, function() {
    return new this.Widgets.PublicationNotebookHero().deletePublication();
  });

  this.When(/^I should see the publication notebook$/, function() {
    return this.driver.wait(function() {
      return new this.Widgets.PublicationNotebook().isVisible()
      .thenCatch(function() {
        return false;
      })
    }.bind(this), global.timeout)
    .should.eventually.eql(true);
  });

  this.Then(/^I should see the author "([^"]*)"$/, function(author) {
    return new this.Widgets.PublicationNotebookHero().author().should.eventually.eql(author);
  });

  this.Then(/^I should see the authors job title "([^"]*)"$/, function(jobTitle) {
    return new this.Widgets.PublicationNotebookHero().authorJobTitle().should.eventually.eql(jobTitle);
  });

  this.Then(/^I should see the authors company "([^"]*)"$/, function(company) {
    return new this.Widgets.PublicationNotebookHero().authorCompany().should.eventually.eql(company);
  });

  this.Then(/^I should see the download link$/, function(company) {
    return new this.Widgets.PublicationNotebookHero().hasDownloadLink();
  });

  this.Then(/^I should see the gravatar for "([^"]*)"$/, function(email) {
    var hash = require('crypto').createHash('md5').update(email).digest('hex');
    var gravatarLink = 'gravatar.com/avatar/' + hash;
    return new this.Widgets.PublicationNotebookHero().gravatarLink().should.eventually.contain(gravatarLink);
  });

  this.When(/^I should be able to collapse and expand inputs$/, function() {
    var notebook = new this.Widgets.PublicationNotebook();

    return notebook.toggle('input').then(function() {
      return notebook.isCollapsed('input');
    })
    .should.eventually.eql(true);
  });

  this.When(/^I should be able to collapse and expand outputs$/, function() {
    var notebook = new this.Widgets.PublicationNotebook();

    return notebook.toggle('output').then(function() {
      return notebook.isCollapsed('output');
    })
    .should.eventually.eql(true);
  });

  this.Then(/^I should see the current date as the publish date$/, function() {
    var d = new Date();
    var currentDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear().toString().substr(2,2);
    return new this.Widgets.PublicationNotebookHero().publishDate().should.eventually.eql(currentDate);
  });
}
