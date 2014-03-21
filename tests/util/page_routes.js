var util = require('util');

module.exports = function() {
  var config = this.config.frontend;

  this.route = {
    home: config.url,

    forProject: function(project) {
      return util.format('%s#/projects/%s', config.url, project.id);
    }
  };
};
