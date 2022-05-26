import express from "express";
import Startup from "./Startup";
import DbContext from "./database/DbConfig";

//create server
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 3000;

//Establish app
Startup.ConfigureGlobalMiddleware(app);
Startup.ConfigureRoutes(app);

//Connect to Atlas MongoDB
DbContext.connect();

//Start Server
server.listen(port, () => {
  console.log(`[SERVING ON PORT: ${port}]`);
});
