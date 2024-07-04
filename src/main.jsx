import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ConstituencyList from './ConstituencyList';
import FullBreakdown from './FullBreakdown';
import AppSettings from './AppSettings';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  { path: '/', element: <ConstituencyList />, errorElement: <ErrorPage /> },
  { path: '/constituency/:code', element: <ConstituencyList />, errorElement: <ErrorPage />},
  { path: '/results', element: <FullBreakdown />, errorElement: <ErrorPage />},
  { path: '/settings', element: <AppSettings />, errorElement: <ErrorPage />},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
