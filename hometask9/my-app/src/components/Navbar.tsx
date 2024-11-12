import React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/userSlice';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleAuthentication = () => {
    if (isAuthenticated) {
      dispatch(logout());
      handleNavigation('/');
    } else {
      handleNavigation('/login');
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={() => handleNavigation('/')}
        >
          Pozharinka
          <WhatshotOutlinedIcon color='info'/>
        </Typography>

        {isAuthenticated && (
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
            <Button
              onClick={() => handleNavigation('/my-posts')}
              sx={{ color: theme.palette.text.primary, fontWeight: 'medium' }}
            >
              My Posts
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => handleNavigation('/create-post')}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderColor: 'primary.main',
                },
                ml: 4
              }}
            >
              Create Post
            </Button>
          </Box>
        )}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 2 }}>
          <Button color="inherit" onClick={handleAuthentication}>
            {isAuthenticated ? (
                <Typography component={"label"} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  Logout
                  <LogoutIcon sx={{ ml: 0.5 }}/>
                </Typography>
            ) : 'Login'}
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
          <MenuItem onClick={() => handleNavigation('/my-posts')}>My Posts</MenuItem>
          <MenuItem onClick={() => handleNavigation('/create-post')}>Create Post</MenuItem>
          <MenuItem onClick={() => handleAuthentication()}>{isAuthenticated ? 'Logout' : 'Login'}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
