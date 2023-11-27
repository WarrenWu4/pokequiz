import React from "react";
import ReactDOM from "react-dom/client";

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Start from './pages/Start.tsx';
import Profile from "./pages/Profile.tsx";
import Game from './pages/Game.tsx';
import QuestionSelector from "./pages/QuestionSelector.tsx";
import GameOver from "./pages/GameOver.tsx";

const router = createBrowserRouter([
    {
        path: "/",
      element: <Start/>
    },
    {
        path: "/user",
        element: <Profile/>
    },
    {
        path:"/game/:id",
        element: <Game/>
    },
    {
        path: "/start/error",
        element: <Start state={"error"}/>,
    },
    {
        path: "/gameover/:score/:quizId",
        element: <GameOver/>
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
