module.exports = function(app) {
  var VendorsController = app.Controllers.VendorsController;

  app.param('vendor_id', VendorsController.idParam);

  app.get('/api/vendors', VendorsController.index);
  app.get('/api/vendors/:vendor_id', VendorsController.get);
};
