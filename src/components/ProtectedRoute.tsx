import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: number;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isLoggedIn, roleId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();  
  const [isAuthChecked, setIsAuthChecked] = useState(false); 

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('here');
      navigate('/login');
    } else if (isLoggedIn && requiredRole && roleId !== requiredRole) {
      navigate('/');
    }

    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('here');
      navigate('/login');
    } else if (isLoggedIn && requiredRole && roleId !== requiredRole) {
      navigate('/');
    }

    setIsAuthChecked(true);
  }, [location.pathname]); 

  if (!isAuthChecked) {
    return <div></div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
