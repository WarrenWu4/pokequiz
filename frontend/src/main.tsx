import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Start from './pages/Start.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './pages/About.tsx';
import Game from './pages/Game.tsx'

const router = createBrowserRouter([
  {
      path: "/",
      element: <Start/>
  },
  {
      path: "/about",
      element: <About/>
  },
  {
    path:"/game/:id",
    element: <Game/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>,
)

const url = import.meta.env.VITE_BACKEND_URL
export default url