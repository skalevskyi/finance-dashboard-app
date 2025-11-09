import { AddEditTransactionPage } from '@/features/transactions/pages/AddEditTransactionPage';
import { TransactionsPage } from '@/features/transactions/pages/TransactionsPage';
import { Dashboard } from '@/pages/Dashboard';
import { NotFound } from '@/pages/NotFound';
import { Settings } from '@/pages/Settings';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/transactions',
        element: <TransactionsPage />,
      },
      {
        path: '/transactions/new',
        element: <AddEditTransactionPage />,
      },
      {
        path: '/transactions/:id/edit',
        element: <AddEditTransactionPage />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

