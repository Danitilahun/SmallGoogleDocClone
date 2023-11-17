// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import useSocket from "../hooks/useSocket";
// import useQuill from "../hooks/useQuill";
// import useDocument from "../hooks/useDocument";
// import useTextChanges from "../hooks/useTextChanges";

// const TextEditor = () => {
//   const { id: documentId } = useParams();
//   const serverUrl = "http://localhost:3001";

//   const socket = useSocket(serverUrl);
//   const { quill, initializeQuill } = useQuill();

//   useDocument(socket, documentId, quill);
//   useTextChanges(socket, quill);

//   useEffect(() => {
//     initializeQuill();
//   }, [initializeQuill]);

//   return <div className="container" ref={initializeQuill}></div>;
// };

// export default TextEditor;

import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import TOOLBAR_OPTIONS from "../util/ToolBar";
import { serverUrl } from "../util/serverUrl";
import useSocket from "../hooks/useSocket";
import useQuill from "../hooks/useQuill";
import useDocument from "../hooks/useDocument";
import useTextChanges from "../hooks/useTextChanges";

export default function TextEditor() {
  const { id: documentId } = useParams();
  const socket = useSocket(serverUrl);

  const { quill, initializeQuill } = useQuill();

  useDocument(socket, documentId, quill);
  useTextChanges(socket, quill);

  useEffect(() => {
    initializeQuill();
  }, [initializeQuill]);
  return <div className="container" ref={initializeQuill}></div>;
}
