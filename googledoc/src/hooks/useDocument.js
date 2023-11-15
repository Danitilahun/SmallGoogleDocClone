import { useEffect } from "react";
const SAVE_INTERVAL_MS = 2000;
const useDocument = (socket, documentId, quill) => {
  useEffect(() => {
    if (socket == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, documentId, quill]);

  useEffect(() => {
    if (socket == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);
};

export default useDocument;
