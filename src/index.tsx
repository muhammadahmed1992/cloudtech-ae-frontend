import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthProvider'; // Import useAuth
import Auth from './components/Auth';
import AdminBooks from './pages/admin/Books';
import Dashboard from './pages/user/Dashboard';
import UserReviews from './pages/user/UserReviews';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { Roles } from './constants/roles';
import Registration from './pages/admin/AdminRegistration';

const router = createBrowserRouter([
  {
    path: '/login',
    element: 
      <Auth />
  },
  {
    path: '/',
    element: <ProtectedRoute>
                <Layout />
              </ProtectedRoute>,
    children: [
      {
        path: '',
        element: (
            <Dashboard />
        ),
      },
      {
        path: 'admin/books',
        element: (
          <ProtectedRoute requiredRole={Roles.ADMIN}>
            <AdminBooks />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/register',
        element: (
          <ProtectedRoute requiredRole={Roles.ADMIN}>
            <Registration />
          </ProtectedRoute>
        ),
      },
      {
        path: 'review',
        element: (
            <UserReviews />
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
