import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../config/firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole as UserRole))) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
