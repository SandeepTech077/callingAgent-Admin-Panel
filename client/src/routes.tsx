import { type RouteObject } from 'react-router';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import DashboardHome from './pages/DashboardHome';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import NotFound from './pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Sidebar />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];