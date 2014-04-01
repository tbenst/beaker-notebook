module.exports = function(app) {
  var Vendor  = app.Models.Vendor;

  return {
    idParam: function(req, res, next) {
      new Vendor({id: req.params.vendor_id}).fetch()
        .then(function(vendor) {
          if (!vendor) {
            throw new Error('vendor not found');
          }
          req.vendor = vendor;
        })
        .done(next, next);
    },

    get: function(req, res) {
      res.json(req.vendor);
    },

    index: function(req, res, next) {
      app.DB.knex('Vendors')
            .select()
            .orderBy("name", "ASC")
            .then(function(vendors){
              res.json(vendors)
            })
            .catch(next);
    }
  }
}
