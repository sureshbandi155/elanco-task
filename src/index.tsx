import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import { Applications } from "./components/pages/Applications/Applications.component";
import { Resources } from "./components/pages/Resources/Resources.component";
import { Layouts } from "./components/layouts/Layouts.component";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layouts>
        <Applications />
      </Layouts>
    ),
  },
  {
    path: "/resources",
    element: (
      <Layouts>
        <Resources />
      </Layouts>
    ),
  },
]);

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
