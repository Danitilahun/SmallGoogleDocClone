require("dotenv").config();
const express = require("express");
const http = require("http");
// const socketio = require("socket.io");
const { Server } = require("socket.io");
const configureSockets = require("./sockets/socket");
const cors = require("cors");
const connectDatabase = require("./config/dbConnection");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "doccollabbydaniel.vercel.app",
    credentials: "true",
  },
});
// Use cors middleware
app.use(cors());
app.get("/", (req, res) => {
  res.send("GET request received!");
});

const dbConnection = connectDatabase();
dbConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
dbConnection.once("open", () => {
  console.log("Connected to MongoDB");
});

configureSockets(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
