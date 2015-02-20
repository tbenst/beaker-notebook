var _ = require('lodash');

module.exports = function(app) {
  var Vendor = app.Models.Vendor;
  return {
    lookup: function(req, res, next, id) {
      Vendor.forge({id: parseInt(id, 10)})
      .fetch()
      .then(function(vendor) {
        req.vendor = vendor;
      })
      .done(next, next);
    },

    create: function(req, res, next) {
      Vendor.forge({name: req.body.name})
      .save()
      .then(res.json.bind(res))
      .catch(function(err) {
        if (err.name == "RecordNotUniqueError") {
          res.status(409).send(err);
        } else {
          next(err);
        }
      });
    },

    get: function(req, res, next) {
      if (!req.vendor) {
        res.status(404);
        throw new Error("Unable to find Vendor");
      }
      res.json(req.vendor);
    },

    update: function(req, res, next) {
      var attrs = _.pick(req.body, 'name');

      if (!req.vendor) {
        res.status(404);
        throw new Error("Unable to find Vendor to update");
      }

      req.vendor.save(attrs, {patch: true})
      .then(res.json.bind(res))
      .catch(next);
    },

    destroy: function(req, res, next) {
      if (!req.vendor) {
        res.status(404);
        throw new Error("Unable to find Vendor to delete");
      }

      req.vendor.destroy()
      .then(res.json.bind(res))
      .catch(next);
    },

    index: function(req, res, next) {
      Vendor.fetchAll()
      .then(res.json.bind(res))
      .catch(next);
    }
  }
};
