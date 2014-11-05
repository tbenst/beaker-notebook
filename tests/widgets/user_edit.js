var $ = require('selenium-webdriver').promise;

module.exports = function() {
  return this.Widgets.EditUserForm = this.Widget.Form.extend({
    root: 'form.user-edit',
    fields: ['name', 'email', 'currentPassword', 'newPassword', 'job_title', 'company', 'bio'],

    contents: function() {
      return $.all([
        this.getValue('#user-name'),
        this.getValue('#user-email'),
        this.getValue('#user-job-title'),
        this.getValue('#user-company'),
        this.getValue('#user-bio')
      ])
      .then(function(attrs) {
        return {
          name: attrs[0],
          email: attrs[1],
          jobTitle: attrs[2],
          company: attrs[3],
          bio: attrs[4]
        }
      });
    }
  });
};
