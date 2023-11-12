import { useEffect } from "react";

const useTextChanges = (socket, quill) => {
  useEffect(() => {
    if (socket == null || quill == null) return;

    const receiveChangesHandler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", receiveChangesHandler);

    return () => {
      socket.off("receive-changes", receiveChangesHandler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const sendChangesHandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", sendChangesHandler);

    return () => {
      quill.off("text-change", sendChangesHandler);
    };
  }, [socket, quill]);
};

export default useTextChanges;
