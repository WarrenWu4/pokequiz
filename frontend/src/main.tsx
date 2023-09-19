import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Start from './pages/Start.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Start/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>,
)

const url = import.meta.env.VITE_BACKEND_URL
export default url