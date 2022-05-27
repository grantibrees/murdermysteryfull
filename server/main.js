import express from "express";
import Socket from "./services/SocketService";
import Startup from "./Startup";
import DbContext from "./database/DbConfig";

//create server
const app = express();
const socketServer = require("http").createServer(app);
const io = require("socket.io")(socketServer);
// const server = require("http").createServer(app);
const port = process.env.PORT || 3000;

//Establish app
Socket.setIO(io);
Startup.ConfigureGlobalMiddleware(app);
Startup.ConfigureRoutes(app);

//Connect to Atlas MongoDB
DbContext.connect();

//Start Server
socketServer.listen(port, () => {
  console.log(`[SERVING ON PORT: ${port}]`);
});
