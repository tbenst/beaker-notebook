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
        .catch(function(err) {
          next(err);
        });
    },

    index: function(req, res, next) {
      DataSet.findAll()
        .then(function(dataSets) {
          res.json(200, dataSets);
        })
        .catch(function(err) {
          next(err);
        });
    },

    create: function(req, res, next) {
      DataSet.create({title: req.params.title})
        .then(function(dataSet) {
          res.json(200, dataSet);
        })
        .catch(function(err) {
          next(err);
        });
    },

    get: function(req, res, next) {
      res.json(200, req.dataSet);
    },

    update: function(req, res, next) {
      req.dataSet.updateAttributes(req.body, ['title', 'vendor', 'description', 'url'])
        .then(function(dataSet) {
          res.json(200, dataSet);
        })
        .catch(function(err) {
          next(err);
        });
    },

    destroy: function(req, res, next) {
      req.dataSet.destroy()
        .then(function() {
          res.json(200, dataSet);
        })
        .catch(function(err) {
          next(err);
        });
    }
  }
};
