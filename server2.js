var cluster = require('cluster');
var util = require('util');
// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
	

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {
var port = process.env.PORT || 8001;
var express = require('express');
var app = express();
var fs = require('fs');
var options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:  fs.readFileSync(__dirname + '/server.crt')
};
var server = require('http').Server(app);

var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({server:server});
// for number of client 

// for masked nd binary data 


app.use(express.static(__dirname));

server.listen(port, function() {
 console.log("Listening on : " + port );
});
wss.on('connection', function(ws) {
	
	ws.on('message',function(message){
		
		ws.send(message);
	});
});
}