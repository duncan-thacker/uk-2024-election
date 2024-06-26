import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ConstituencyList from './ConstituencyList';

const router = createBrowserRouter([
  { path: '/', element: <ConstituencyList />},
  { path: '/constituency/:code', element: <ConstituencyList />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
