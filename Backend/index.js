require("dotenv").config();
// const express = require("express");
// const http = require("http");
// // const socketio = require("socket.io");
// const { Server } = require("socket.io");
// const configureSockets = require("./sockets/socket");
// const cors = require("cors");
// const connectDatabase = require("./config/dbConnection");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: "true",
//   },
// });
// // Use cors middleware
// app.use(cors());

// const dbConnection = connectDatabase();
// dbConnection.on(
//   "error",
//   console.error.bind(console, "MongoDB connection error:")
// );
// dbConnection.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// configureSockets(io);

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const mongoose = require("mongoose");
const Document = require("./model/document");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    console.log("document.data", document);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      console.log(delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      console.log("save-document", data);
      await Document.findByIdAndUpdate(documentId, {
        data: data,
      });
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  console.log("document", document, id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
