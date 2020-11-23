const fs = require("fs");
const express = require("express");
const bodyparser = require("body-parser");
const mongoos = require("./DB/mongo_db");
const Loger = require("./Util/Loger");

const Allroutes = require("./Routes/export_all_routes");
const server = express();

// ----------------  Https  ---------------
const https = require("https");
const httpsport = 3300;
// ----------------  End-Https ---------------

server.use(bodyparser.json());

server.use(express.static("../Front-End/build"));
const path = require("path");
server.get("/", (req, res) => {
  const ree = path.join(__dirname, "../Front-End/build/index.html");
  res.sendFile(ree);
});

Allroutes.map((route) => {
  server.use(route.path, route.file);
});

https
  .createServer(
    {
      key: fs.readFileSync("./SSL/server.key"),
      cert: fs.readFileSync("./SSL/server.cert"),
    },
    server
  )
  .listen(httpsport, () => {
    Loger.info(`Server Started on port : ${httpsport}`);
  });
