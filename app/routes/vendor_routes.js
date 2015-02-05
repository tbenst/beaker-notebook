module.exports = function(app) {
  var VendorsController = app.Controllers.VendorsController;

  app.param('vendor_id', VendorsController.lookup);
  app.post('/api/vendors', VendorsController.create);
  app.get('/api/vendors/:vendor_id', VendorsController.get);
  app.put('/api/vendors/:vendor_id', VendorsController.update);
  app.del('/api/vendors/:vendor_id', VendorsController.destroy);
  app.get('/api/vendors', VendorsController.index);
}
