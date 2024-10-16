import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Roles } from '../constants/roles';

interface NavBarProps {
  onLogout: () => void;
}

const NavBar = ({ onLogout }: NavBarProps) => {
  const { roleId } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false); 

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: 'Dashboard', link: '/' },
    { label: 'Reviews', link: '/review' },
  ];

  if (roleId === Roles.ADMIN) {
    menuItems.push({ label: 'Books', link: '/admin/books' });
    menuItems.push({ label: 'Register', link: '/admin/register' });
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Book-Review Manager
          </Typography>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => toggleDrawer(true)}
            style={{ display: 'none', marginLeft: 'auto' }}
            sx={{ display: { xs: 'block', md: 'none' } }} 
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
            <Button color="inherit" component={Link} to="/" sx={{ display: { xs: 'none', md: 'block' } }}>
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/review" sx={{ display: { xs: 'none', md: 'block' } }}>
              Reviews
            </Button>
            {roleId === Roles.ADMIN && (
              <Button color="inherit" component={Link} to="/admin/books" sx={{ display: { xs: 'none', md: 'block' } }}>
                Books
              </Button>
            )}
            {roleId === Roles.ADMIN && (
              <Button color="inherit" component={Link} to="/admin/register" sx={{ display: { xs: 'none', md: 'block' } }}>
                Register
              </Button>
            )}
            <Button color="inherit" onClick={onLogout} sx={{ display: { xs: 'none', md: 'block' } }}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} component={Link} to={item.link} onClick={() => toggleDrawer(false)}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItem onClick={() => { onLogout(); toggleDrawer(false); }}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
