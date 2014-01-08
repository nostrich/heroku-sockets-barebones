var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000
  , Moniker = require('moniker')
  , _ = require('underscore');

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

console.log('http server listening on %d', port);

var wss = new WebSocketServer({server: server});
console.log('websocket server created');
wss.on('connection', function(ws) {
  console.log('websocket connection open');
  ws.send(JSON.stringify({ message: "websocket open"}));

  ws.on('message', function(message) {
    var msg = JSON.parse(message);
    console.log(msg);
  });
  
  ws.on('close', function() {
      console.log('websocket connection close');
  });

});