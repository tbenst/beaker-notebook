
/**
 * Module dependencies.
 */

var express = require('express');
var when = require('when');
var http = require('http');
var path = require('path');
var _ = require('lodash');
var app = express();

app.Models = require('./models');
app.Controllers = require('./controllers');
app.Routes = require('./routes');

when(app)
  .then(app.Models.init)
  .then(app.Controllers.init)
  .then(appConfig)
  .then(app.Routes.init)
  .then(appStart)
  .catch(function(err) {
    console.log(err.stack);
  });

function appConfig(app) {
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if (_.contains(['test', 'development'], app.get('env'))) {
    // allow cross origin requests in DEV and TEST
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,HEAD');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
        res.send(200);
      }
      else {
        next();
      }
    });

    app.use(express.errorHandler());
  }

  app.use(app.Controllers.AuthController.authorize);
  app.use(app.router);

  return app;
}

function appStart() {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Bunsen server listening on port ' + app.get('port'));
  })
};
