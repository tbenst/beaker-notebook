module.exports = function(app) {
  var User = app.Models.User;

  return {
    authenticate: function (req, res, next) {
      new User({email: req.body.email})
        .fetch()
        .then(function(user) {
          if (user) {
            var u = _.pick(user.attributes, 'id', 'name', 'email');
            res.json(_.extend(u, {token: user.id}));
          } else {
            res.statusCode = 401;
            next(new Error("User not found"));
          }
        })
        .catch(next);
    }
  }
}

