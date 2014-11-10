var _  = require('lodash');
var express = require('express');
var http = require('http');
var app = express();
var Promise = require('bluebird');

app.Controllers = require('./controllers');
app.Routes = require('./routes');

Promise.resolve(app)
  .then(app.Controllers.init)
  .then(appConfig)
  .then(app.Routes.init)
  .then(appStart)
  .catch(function(err) {
    console.log(err.stack);
  });

function appConfig(app) {
  // all environments
  app.set('port', process.env.PROVISIONER_PORT || 3001);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser('your secret goes here'));
  app.use(express.session());

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

  app.use(app.router);

  return app;
}

function appStart() {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Provisioner server listening on port ' + app.get('port'));
  })
};
