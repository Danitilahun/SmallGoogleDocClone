import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import useDocument from "../../hooks/useDocument";
import useTextChanges from "../../hooks/useTextChanges";
import useQuill from "../../hooks/useQuill";

const TextEditor = () => {
  const { id: documentId } = useParams();
  const serverUrl = "http://localhost:3001";

  const socket = useSocket(serverUrl);
  const { quill, initializeQuill } = useQuill();

  useDocument(socket, documentId, quill);
  useTextChanges(socket, quill);

  useEffect(() => {
    initializeQuill();
  }, [initializeQuill]);

  return <div className="container" ref={initializeQuill}></div>;
};

export default TextEditor;
