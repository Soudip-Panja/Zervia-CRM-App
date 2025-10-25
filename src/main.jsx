import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.jsx'
import Leads from './Pages/Leads.jsx';
import SalesAgents from './Pages/SalesAgents.jsx';
import Reports from './Pages/Reports.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/leads",
    element: <Leads />
  },
  {
    path: "/salesAgent",
    element: <SalesAgents />
  },
  {
    path: "/reports",
    element: <Reports />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
