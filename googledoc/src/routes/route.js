import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import TextEditor from "../Editor/editor";
import { v4 as uuidV4 } from "uuid";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path=""
        exact
        element={<Navigate to={`/documents/${uuidV4()}`} replace={true} />}
      />
      <Route path="documents/:id" element={<TextEditor />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

export default router;
