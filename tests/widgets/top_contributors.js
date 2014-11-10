var $ = require('selenium-webdriver').promise;

module.exports = function() {
  this.Widgets.TopContributorList = this.Widget.List.extend({
    root: '.contributors',
    itemSelector: '.contributor',

    contents: function() {
      return this.map(function(n) {
        return $.all([n.read('.name'), n.read('.job-title'), n.read('.company'), n.getAttribute({selector: '.icon', attribute: 'src' }) ])
        .then(function(attrs) {
          return {
            name: attrs[0],
            job_title: attrs[1],
            company: attrs[2],
            icon_src: attrs[3]
          }
        });
      });
    }
  });
};
