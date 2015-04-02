var moment = require('moment');
var Promise = require('bluebird');
var notebookBase = require('../fixtures/notebook_data_sample');
var _ = require('lodash');

function publicationAttrs(attrs) {
  var base = {
    ":publication/notebook-id": "123",
    ":publication/author": 1,
    ":publication/name": "Publication",
    ":publication/description": "Beaker Solo publication",
    ":publication/category": 17592186045418,
    ":publication/contents": "{\"beaker\":\"2\",\"evaluators\":[{\"name\":\"Html\",\"plugin\":\"Html\",\"view\":{\"cm\":{\"mode\":\"htmlmixed\"}}},{\"name\":\"Latex\",\"plugin\":\"Latex\",\"view\":{\"cm\":{\"mode\":\"stex\"}}},{\"name\":\"IPython\",\"plugin\":\"IPython\",\"imports\":\"\",\"supplementalClassPath\":\"\"},{\"name\":\"JavaScript\",\"plugin\":\"JavaScript\",\"jsSetting2\":\"\",\"jsSetting1\":\"\",\"view\":{\"cm\":{\"mode\":\"javascript\",\"background\":\"#FFE0F0\"}}},{\"name\":\"Node\",\"plugin\":\"Node\",\"view\":{\"cm\":{\"mode\":\"javascript\"}}}],\"cells\":[{\"id\":\"section001\",\"type\":\"section\",\"level\":1,\"title\":\"Hello Beaker\",\"collapsed\":false,\"evaluatorReader\":false},{\"id\":\"section7np9PW\",\"type\":\"section\",\"title\":\"New Section H2\",\"level\":2,\"evaluatorReader\":false,\"collapsed\":false},{\"id\":\"text6v9PwO\",\"type\":\"text\",\"body\":\"this is a text cell\",\"evaluatorReader\":false},{\"id\":\"sectionCY4fCm\",\"type\":\"section\",\"title\":\"New Section H3\",\"level\":3,\"evaluatorReader\":false,\"collapsed\":false},{\"id\":\"markdown3WdhVr\",\"type\":\"markdown\",\"body\":\"### ok\\n## this\\n# is\\n__markdown__\",\"evaluatorReader\":false,\"mode\":\"preview\"},{\"id\":\"codeZhXco4\",\"type\":\"code\",\"evaluator\":\"Node\",\"input\":{\"body\":\"1+1 //node\"},\"output\":{\"selectedType\":\"Text\",\"state\":{},\"result\":\"2\"},\"evaluatorReader\":true,\"lineCount\":1},{\"id\":\"sectionT9MNJ0\",\"type\":\"section\",\"title\":\"New Section H4\",\"level\":4,\"evaluatorReader\":false,\"collapsed\":false},{\"id\":\"code301W1U\",\"type\":\"code\",\"evaluator\":\"JavaScript\",\"input\":{\"body\":\"25*2\"},\"output\":{\"selectedType\":\"Text\",\"state\":{},\"result\":\"50\"},\"evaluatorReader\":true,\"lineCount\":1},{\"id\":\"text97Oipt\",\"type\":\"text\",\"body\":\"<p style=\\\"margin-bottom: 15px; color: rgb(0, 0, 0); font-family: Helvetica, arial, freesans, clean, sans-serif; font-size: 15px; line-height: 20px;\\\">Beaker also supports <b>Julia</b>, <b>Groovy</b>, <b>Ruby</b>, and <b>Node</b>. To add another language to this notebook, select <b>Notebook</b> ▶ <b>Plugin manager</b> from the menu on top of the screen.</p><p style=\\\"margin-top: 15px; color: rgb(0, 0, 0); font-family: Helvetica, arial, freesans, clean, sans-serif; font-size: 15px; line-height: 20px; margin-bottom: 0px !important;\\\">For general help, see the tutorial notebook under <b>Help</b> ▶ <b>Tutorial notebook</b></p>\",\"evaluatorReader\":false}],\"namespace\":{}}",
  };
  return _.merge(base, attrs);
}

function categoryAttrs(attrs) {
  var base = {
    ":category/name": "Finance",
    ":category/description": "Finance stuff"
  };
  return _.merge(base, attrs);
}

module.exports = function() {
  var p = this.beakerPublications;

  this.When(/^I view the Beaker publications page$/, function() {
    return this.driver.get(this.route.beakerPublications);
  });

  this.When(/^I view the Beaker publication$/, function() {
    var _this = this;
    return _this.driver.get(_this.route.beakerPublications).then(function() {
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

  this.Given(/^there are (\d+) Beaker publications$/, function(count) {
    return Promise.resolve(_.range(count))
    .each(function(i) {
      return p.createPublication(publicationAttrs({":publication/name": "Beaker publication " + i}));
    });
  });

  this.Given(/^there are (\d+) Beaker publications in the "([^"]*)" category$/, function(count, categoryName) {
    p.getCategories()
    .then(function(categories){
      var found = _.find(categories, function (c) {return c.name == categoryName});
      return Promise.each(_.range(count), function(i) {
        return p.createPublication(publicationAttrs({
          ":publication/name": "Beaker publication " + i,
          ":publication/category": found.id
        }));
      });
    })
  });

  this.Given(/^I have the following Beaker publication categories:$/, function(table) {
    return Promise.resolve(table.hashes())
    .each(function(row) {
      var attrs = _.object(_.map(row, function (val, key) {
        return [":category/" + key, val];
      }));
      return p.createCategory(categoryAttrs(attrs));
    });
  });

  this.Given(/^there is Beaker publication named "([^"]*)"$/, function(name) {
    return p.createPublication(publicationAttrs({":publication/name": name}));
  });
}
