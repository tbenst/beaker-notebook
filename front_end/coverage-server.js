var path    = require('path');
var express = require('express');
var port    = process.env["PORT"] || 8080;
var url     = require('url')
var app     = express();
var im      = require('istanbul-middleware');
var publicDir = path.resolve(__dirname, "public");

function matcher(req) {
  var parsed = url.parse(req.url);
  return parsed.pathname && parsed.pathname.match(/\.js$/) && !parsed.pathname.match(/vendor|templates/);
}

im.hookLoader(__dirname, { verbose: true });

app.use('/coverage', im.createHandler({ verbose: true, resetOnGet: false }));
app.use(im.createClientHandler(publicDir, { matcher: matcher }));

app.use(express.static(publicDir));

console.log("Test coverage server on " + port);
app.listen(port)
