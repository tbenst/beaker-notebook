module.exports = function(app) {
  var FilesController = app.Controllers.FilesController;

  app.get('/api/files', FilesController.index);
  app.post('/api/files', FilesController.uploadFile);
  app.del('/api/files', FilesController.deleteFiles);
  app.get('/api/files/quota', FilesController.quota);
};
