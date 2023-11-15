const Document = require("../model/document");
const findOrCreateDocument = require("../util/findOrCreateDocument");

function configureSockets(io) {
  io.on("connection", (socket) => {
    socket.on("get-document", async (documentId) => {
      console.log("get-document", documentId);
      const document = await findOrCreateDocument(documentId);
      console.log("document", document);
      socket.join(documentId);
      socket.emit("load-document", document.data);

      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });

      socket.on("save-document", async (data) => {
        await Document.findByIdAndUpdate(documentId, { data });
      });
    });
  });
}

module.exports = configureSockets;
