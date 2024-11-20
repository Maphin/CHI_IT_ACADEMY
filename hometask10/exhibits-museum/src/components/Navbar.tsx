'use client';

import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/userSlice';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAuthentication = () => {
    if (isAuthenticated) {
      dispatch(logout());
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Link href="/exhibits" passHref style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            Pozharinka
            <WhatshotOutlinedIcon color="info" />
          </Link>
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
            <Button
              onClick={handleMenuClose}
              sx={{ color: theme.palette.text.primary, fontWeight: 'medium' }}
            >
              <Link href="/my-posts" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                My Posts
              </Link>
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderColor: 'primary.main',
                },
                ml: 4,
              }}
            >
              <Link href="/create-post" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                Create Post
              </Link>
            </Button>
          </Box>
        )}
        
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 2 }}>
          <Button color="inherit" onClick={handleAuthentication}>
            {isAuthenticated ? (
              <Typography component="label" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                Logout
                <LogoutIcon sx={{ ml: 0.5 }} />
              </Typography>
            ) : (
              <Link href="/login" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Link>
            )}
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton size="large" edge="start" color="inherit" onClick={handleMenuOpen} aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          {isAuthenticated && (
            <Box>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/my-posts" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  My Posts
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/create-post" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  Create Post
                </Link>
              </MenuItem>
            </Box>
          )}
          <MenuItem onClick={handleAuthentication}>
            {isAuthenticated ? 'Logout' : (
              <Link href="/login" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Link>
            )}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
