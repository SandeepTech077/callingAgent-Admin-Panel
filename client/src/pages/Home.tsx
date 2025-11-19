import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect directly to login page instead of showing welcome
  return <Navigate to="/login" replace />;
}