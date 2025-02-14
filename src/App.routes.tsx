// src/routes/AppRoutes.tsx

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import InvoiceListPage from './pages/InvoiceListPage';
import CreateInvoicePage from './pages/CreateInvoicePage';
import EditInvoicePage from './pages/EditInvoicePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <InvoiceListPage />
  },
  {
    path: '/invoices/create',
    element: <CreateInvoicePage />
  },
  {
    path: '/invoices/edit/:id',
    element: <EditInvoicePage />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
