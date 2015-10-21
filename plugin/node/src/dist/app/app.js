'use strict';

var express = require('express'),
    faye = require('faye'),
    http = require('http');

var uuid = require('node-uuid');

var app = express(),
    server = http.createServer(app),
    bayeux = new faye.NodeAdapter({mount: '/cometd', timeout: 45});

bayeux.attach(server);

bayeux.on('handshake', function(clientId) {
  console.log('Client connected', clientId);
});



var port = process.argv[2];
var host = process.argv[3];

console.log('Server Starting');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.basicAuth('beaker', process.env.beaker_plugin_password));

// route for testing service is alive
app.get('/pulse', function(request, response){
    response.send('node server is running');
});

app.post('/shell', function(request, response){
    var returnObject = {'shellID':uuid.v4()};
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(returnObject));
});

app.post('/setShellOptions', function(request, response){
  response.end();
});

app.post('/exit', function(request, response){
  console.log('Server exit');
  response.end();
});


app.get('/ready', function(request, response){
  response.send('ok');
  response.end();
});

app.post('/evaluate', function(request, response){

    var Worker = require('webworker-threads').Worker;

    var worker = new Worker(function(){
      this.onmessage = function(event) {
        postMessage(event.data);
        self.close();
      };
    });
    
    worker.onmessage = function(event) {
      var shellID = request.body.shellID;
      var code =  decodeURIComponent(request.body.code);
      
      var simpleEvaluationObject = {
          "type" : "SimpleEvaluationObject",
          "update_id" : uuid.v4(),
          "expression" : code,
          "status" : "RUNNING",
          "outputdata" : [ ]
        };
      
      response.send(simpleEvaluationObject);
      bayeux.getClient().publish('/object_update/' + simpleEvaluationObject.update_id, simpleEvaluationObject);
      
      var evaluationResult = processCode(code);
      if (evaluationResult.processed){
        simpleEvaluationObject.status = "FINISHED";
      } else {
        simpleEvaluationObject.status = "ERROR";
      }
      
      simpleEvaluationObject.outputdata = evaluationResult.evaluation;
      
      bayeux.getClient().publish('/object_update/' + simpleEvaluationObject.update_id, simpleEvaluationObject);
      
      
      // response.send(evaluationResult.evaluation.toString());
    };

    worker.postMessage('');    
});

function processCode(code) {
    var returnValue;
    var result;
    try {
        result = eval(code);
        if(typeof result === "undefined"){
            result =  'undefined';
        }
        returnValue = {evaluation:result,
                       processed:true};
    } catch (e) {
        returnValue = {evaluation:'Error: ' + e.message + '\n' + e.stack,
                       processed:false};
    }
    return returnValue;
}

server.listen(port, host);


