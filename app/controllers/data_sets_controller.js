module.exports = function(app) {

  var DataSet = app.Models.DataSet;

  return {
    idParam: function(req, res, next, id) {
      DataSet.find({where: {id: req.params.data_set_id}})
        .then(function(dataSet) {
          if (!dataSet) return next(new Error('DataSet not found'));
          req.dataSet = dataSet;
          next();
        })
        .catch(next);
    },

    index: function(req, res, next) {
      DataSet.findAll()
        .then(function(dataSets) {
          res.json(dataSets);
        })
        .catch(next);
    },

    create: function(req, res, next) {
      DataSet.create({title: req.params.title})
        .then(function(dataSet) {
          res.json(dataSet);
        })
        .catch(next);
    },

    get: function(req, res, next) {
      req.dataSet.getUsers().then(function(users) {
        req.dataSet['dataValues'].users = users;
        res.json(req.dataSet);
      }).catch(next);
    },

    update: function(req, res, next) {
      req.dataSet.updateAttributes(req.body, ['title', 'vendor', 'description', 'url'])
        .then(function(dataSet) {
          res.json(dataSet);
        })
        .catch(next);
    },

    destroy: function(req, res, next) {
      req.dataSet.destroy()
        .then(function() {
          res.json(dataSet);
        })
        .catch(next);
    }
  };
};
