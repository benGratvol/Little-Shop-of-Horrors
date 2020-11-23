const WebSocketServer = require("websocket").server;
const http = require("http");
const UID = "VGhlcm1vbWV0ZXItMg==";
const PORT = 8200;
const server = http.createServer(function (request, response) {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(PORT, function () {
  console.log(`${new Date()} | Server is listening on port ${PORT}`);
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on("request", function (request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  let connection = request.accept("echo-protocol", request.origin);

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      if (message.utf8Data === "send") {
        const message = {
          UID: UID,
          Cel: FakeTempCel(),
          Far: Math.floor(FakeTempCel() * 1.8),
        };
        console.log(message);
        connection.sendUTF(JSON.stringify(message));
      }
      if (message.utf8Data === "end") {
      }
    } else if (message.type === "binary") {
      console.log(
        "Received Binary Message of " + message.binaryData.length + " bytes"
      );
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on("close", function (reasonCode, description) {
    console.log(
      new Date() + " Peer " + connection.remoteAddress + " disconnected."
    );
  });
});
function FakeTempCel() {
  return Math.floor(Math.random() * (50 - 25)) + 25;
}
