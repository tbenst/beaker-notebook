var authorize = require('../lib/admin_middleware');

module.exports = function(app) {
  var VendorsController = app.Controllers.VendorsController;

  app.param('vendor_id', authorize, VendorsController.lookup);
  app.post('/api/vendors', authorize, VendorsController.create);
  app.get('/api/vendors/:vendor_id', authorize, VendorsController.get);
  app.put('/api/vendors/:vendor_id', authorize, VendorsController.update);
  app.del('/api/vendors/:vendor_id', authorize, VendorsController.destroy);
  app.get('/api/vendors', authorize, VendorsController.index);
}
