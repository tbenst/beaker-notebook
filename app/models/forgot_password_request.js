var mailer = require('../lib/mailer'),
    crypto = require('crypto'),
    _      = require('lodash'),
    PasswordResetException = require('../lib/password_reset_exception');


module.exports = function(Bookshelf, app) {
  var ForgotPasswordRequests = Bookshelf.Model.extend({
    tableName: "forgot_password_requests",
    hasTimestamps: true,
  });

  ForgotPasswordRequests = _.extend(ForgotPasswordRequests, {

    sendRequest: function(attrs) {
      return app.Models.User.forge({email: attrs.email}).fetch()
        .then(function(user) {
          if (user === null) { throw new PasswordResetException('The entered email is not registered'); }
          return crypto.randomBytes(64, function (err, buf) {
            var requestId = buf.toString('hex')
            return ForgotPasswordRequests.forge({userId: user.attributes.id, requestId: requestId}).save()
              .then(function(fpr) {
                return mailer.sendPasswordResetEmail({requestId: requestId, to: attrs.email}, function(err, res) {
                  if(err) { throw err }
                })
              })
          });
        })
    }
  })

  return {
    name: "ForgotPasswordRequests",
    model: ForgotPasswordRequests
  };
}
