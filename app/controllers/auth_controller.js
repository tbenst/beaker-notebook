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
    },

    authorize: function(req, res, next) {
      if (req.path === '/api/authenticate') {
        next();
      } else {
        new User({id: req.get('Authorization')})
          .fetch()
          .then(function(user) {
            if (user) {
              req.user = user;
            } else {
              res.statusCode = 403;
              throw new Error("Unauthorized");
            }
          })
          .done(next, next);
      }
    }
  }
}

