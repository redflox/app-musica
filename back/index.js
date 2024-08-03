// Creacion y configuracion del servidor
const http = require("http");
const app = require("./src/app");
const { connectToDatabase } = require("./src/config/db");
const { createBucket } = require("./src/config/s3");

// Configuracion del dotenv
require("dotenv").config();

// Creacion del servidor
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

//Listeners
server.on("listening", () => {
  console.info(`Server running on port ${PORT}`);
  connectToDatabase();
  const { Artist, Song, User } = require("./src/models");
  createBucket();
});

server.on("error", (error) => {
  console.error(`Error starting server: ${error}`);
});
