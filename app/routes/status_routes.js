module.exports = function(app) {
  app.get('/api/status', function(req, res, next) {
    res.send(200);
  });
}
