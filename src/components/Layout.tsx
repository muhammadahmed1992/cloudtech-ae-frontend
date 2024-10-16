
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; 

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleLogoutAndRedirect = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <div>
      <NavBar onLogout={handleLogoutAndRedirect} />
      <Outlet />
    </div>
  );
};

export default Layout;
