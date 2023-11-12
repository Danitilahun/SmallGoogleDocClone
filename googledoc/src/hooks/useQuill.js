import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const SAVE_INTERVAL_MS = 2000;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["font", "size", "bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "video"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["code-block", "formula"],
  ["clean"],
];

const useQuill = (wrapperRef) => {
  const [quill, setQuill] = useState();

  const initializeQuill = useCallback(() => {
    if (wrapperRef == null) return;

    wrapperRef.innerHTML = "";
    const editor = document.createElement("div");
    wrapperRef.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, [wrapperRef]);

  return { quill, initializeQuill };
};

export default useQuill;
