var W       = require('when');

module.exports = function(app) {
  var User    = app.Models.User;
  var DataSet = app.Models.DataSet;

  return {
    userIdParam: function(req, res, next) {
      User.find({where: {id: req.params.user_id}})
        .then(function(user) {
          if (!user) {
            throw new Error('User not found');
          }
          req.user = user;
        })
        .done(next, next);
    },

    subscribe: function(req, res, next) {
      req.user.addSubscription(req.dataSet).then(function(){
        res.json(req.user);
      }).catch(next);
    },

    unsubscribe: function(req, res, next) {
      req.user.removeSubscription(req.dataSet).then(function(){
        res.json(req.user);
      }).catch(next);
    }
  }
}
