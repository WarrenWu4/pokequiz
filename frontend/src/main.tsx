import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Start from "./pages/Start.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./pages/About.tsx";
import QuestionSelector from "./pages/QuestionSelector.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Start />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/question",
        element: <QuestionSelector />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

const url = import.meta.env.VITE_BACKEND_URL;
export default url;
