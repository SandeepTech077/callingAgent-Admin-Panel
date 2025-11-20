import { type RouteObject } from 'react-router';
import { Login, ProtectedRoute } from './components/auth';
import { Sidebar } from './components/layout';
import DashboardHome from './pages/DashboardHome';
import Users from './pages/Users';
import ViewUser from './pages/ViewUser';
import EditUser from './pages/EditUser';
import Assistant from './pages/Assistant';
import AssistantCreate from './pages/AssistantCreate';
import AssistantView from './pages/AssistantView';
import AssistantEdit from './pages/AssistantEdit';
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
        path: "users/:id/view",
        element: <ViewUser />,
      },
      {
        path: "users/:id/edit",
        element: <EditUser />,
      },
      {
        path: "assistant",
        element: <Assistant />,
      },
      {
        path: "assistants/create",
        element: <AssistantCreate />,
      },
      {
        path: "assistants/:id/view",
        element: <AssistantView />,
      },
      {
        path: "assistants/:id/edit",
        element: <AssistantEdit />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
