import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.jsx'
import Leads from './Pages/Leads.jsx';
import LeadDetails from './Pages/LeadDetails.jsx';
import SalesAgents from './Pages/SalesAgents.jsx';
import Reports from './Pages/Reports.jsx';
import Settings from './Pages/Settings.jsx';

import AddSalesAgentForm from './Components/AddSalesAgentForm.jsx';
import AddLeadForm from './Components/AddLeadForm.jsx';

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
    path: "/leads/:leadId",
    element: <LeadDetails />
  },
  {
    path: "/salesAgent",
    element: <SalesAgents />
  },
  {
    path: "/reports",
    element: <Reports />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/addSalesAgent",
    element: <AddSalesAgentForm />
  },
  {
    path: "/addLeads",
    element: <AddLeadForm />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
