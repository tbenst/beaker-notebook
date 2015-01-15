module.exports = function() {
  this.Given(/^I have a publication$/, function() {
    return this.seed.populate({
      model: "Publication",
      data: {
        notebook_id: 1,
        name: "sample publication",
        description: "",
        contents: "{\"beaker\":\"2\",\"evaluators\":[{\"name\":\"Html\",\"plugin\":\"Html\",\"view\":{\"cm\":{\"mode\":\"htmlmixed\"}}},{\"name\":\"Latex\",\"plugin\":\"Latex\",\"view\":{\"cm\":{\"mode\":\"stex\"}}},{\"name\":\"IPython\",\"plugin\":\"IPython\",\"imports\":\"\",\"supplementalClassPath\":\"\"},{\"name\":\"JavaScript\",\"plugin\":\"JavaScript\",\"jsSetting2\":\"\",\"jsSetting1\":\"\",\"view\":{\"cm\":{\"mode\":\"javascript\",\"background\":\"#FFE0F0\"}}},{\"name\":\"Node\",\"plugin\":\"Node\",\"view\":{\"cm\":{\"mode\":\"javascript\"}}}],\"cells\":[{\"id\":\"section001\",\"type\":\"section\",\"level\":1,\"title\":\"Hello Beaker\",\"collapsed\":false,\"evaluatorReader\":false},{\"id\":\"section7np9PW\",\"type\":\"section\",\"title\":\"New Section H2\",\"level\":2,\"evaluatorReader\":false,\"collapsed\":false},{\"id\":\"text6v9PwO\",\"type\":\"text\",\"body\":\"this is a text cell\",\"evaluatorReader\":false},{\"id\":\"sectionCY4fCm\",\"type\":\"section\",\"title\":\"New Section H3\",\"level\":3,\"evaluatorReader\":false,\"collapsed\":false},{\"id\":\"markdown3WdhVr\",\"type\":\"markdown\",\"body\":\"### ok\\n## this\\n# is\\n__markdown__\",\"evaluatorReader\":false,\"mode\":\"preview\"},{\"id\":\"codeZhXco4\",\"type\":\"code\",\"evaluator\":\"Node\",\"input\":{\"body\":\"1+1 //node\"},\"output\":{\"selectedType\":\"Text\",\"state\":{},\"result\":\"2\"},\"evaluatorReader\":true,\"lineCount\":1},{\"id\":\"sectionT9MNJ0\",\"type\":\"section\",\"title\":\"New Section H4\",\"level\":4,\"evaluatorReader\":false,\"collapsed\":false},{\"id\":\"code301W1U\",\"type\":\"code\",\"evaluator\":\"JavaScript\",\"input\":{\"body\":\"25*2\"},\"output\":{\"selectedType\":\"Text\",\"state\":{},\"result\":\"50\"},\"evaluatorReader\":true,\"lineCount\":1},{\"id\":\"text97Oipt\",\"type\":\"text\",\"body\":\"<p style=\\\"margin-bottom: 15px; color: rgb(0, 0, 0); font-family: Helvetica, arial, freesans, clean, sans-serif; font-size: 15px; line-height: 20px;\\\">Beaker also supports <b>Julia</b>, <b>Groovy</b>, <b>Ruby</b>, and <b>Node</b>. To add another language to this notebook, select <b>Notebook</b> ▶ <b>Plugin manager</b> from the menu on top of the screen.</p><p style=\\\"margin-top: 15px; color: rgb(0, 0, 0); font-family: Helvetica, arial, freesans, clean, sans-serif; font-size: 15px; line-height: 20px; margin-bottom: 0px !important;\\\">For general help, see the tutorial notebook under <b>Help</b> ▶ <b>Tutorial notebook</b></p>\",\"evaluatorReader\":false}],\"namespace\":{}}",
        categoryId: 0
      },
      associations: [
        {
          foreignKey: "userId",
          lookup: {
            User: {email: "u@r.edu"}
          }
        }
      ]
    });
  });

  this.When(/^I view the publication$/, function() {
    var _this = this;
    return _this.driver.get(_this.route.publications).then(function() {
      _this.driver.wait(function() {
        return new _this.Widgets.PublicationList().at(0).then(function(el) {
          return el.isPresent();
        }).then(function(v) {
          return v;
        })
        .thenCatch(function() {
          return false;
        })
      }, global.timout)
      .then(function() {
        return new _this.Widgets.PublicationList().at(0).then(function(el) {
          return el.click("a.title");
        })
      });
    });
  });

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

  this.Then(/^I should see the gravatar for "([^"]*)"$/, function(email) {
    var hash = require('crypto').createHash('md5').update(email).digest('hex');
    var gravatarLink = 'https://secure.gravatar.com/avatar/' + hash + '?d=retro&size=100';
    return new this.Widgets.PublicationNotebookHero().gravatarLink().should.eventually.eql(gravatarLink);
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
    return new this.Widgets.PublicationNotebookHero().publishDate().should.eventually.eql("Published: "+ currentDate);
  });
}
