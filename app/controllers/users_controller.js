var _ = require("lodash");

module.exports = function(app) {
  var User = app.Models.User,
      Publication = app.Models.Publication,
      knex = app.DB.knex,
      userParams = ['name', 'email', 'id', 'jobTitle', 'company', 'bio'];

  function setGravatar (user) {
    return user.set('gravatar', user.gravatar());
  }

  return {
    contributors: function(req, res, next) {
      knex.select('user_id', knex.raw('COUNT(publications.id) as publication_count'))
        .from('publications')
        .groupBy('user_id')
        .orderBy('publication_count', 'desc')
        .limit(5)
      .then(res.json.bind(res))
      .catch(next);
    },

    contributorsByCat: function(req, res, next) {
      knex.select('user_id', knex.raw('COUNT(publications.id) as publication_count'))
        .from('publications')
        .rightJoin('publication_categories', 'publications.category_id', 'publication_categories.id')
        .where('publication_categories.id', req.params.cat_id)
        .groupBy('user_id')
        .orderBy('publication_count', 'desc')
        .limit(5)
      .then(res.json.bind(res))
      .catch(next);
    },

    subscribe: function(req, res, next) {
      req.user.addSubscription(req.params.index, req.params.data_set_id)
        .then(function() {
          res.json(req.user);
        }).catch(next);
    },

    unsubscribe: function(req, res, next) {
      req.user.removeSubscription(req.params.index, req.params.data_set_id)
        .then(function() {
          res.json(req.user);
        }).catch(next);
    },

    get: function (req, res, next) {
      res.json(req.user);
    },

    update: function (req, res, next) {
      var attrs = _(req.body)
        .pick(userParams.concat('currentPassword', 'newPassword'))
        .omit('id')
        .value();

      req.user.update(attrs)
        .then(function (user) {
          res.json(_.pick(user.attributes, userParams));
        })
        .catch(function (err) {
          var statusCode = 500;
          if (err.errors && err.errors.email) {
            err.message = err.errors.email.message;
            statusCode = 422;
          } else if (err.message == 'Wrong Password') {
            statusCode = 422;
          }
          res.status(statusCode).send(err.message);
        });
    }
  }
}
