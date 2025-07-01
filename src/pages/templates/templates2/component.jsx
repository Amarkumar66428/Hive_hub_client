import React from 'react';
import {
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  Person,
  ShoppingBag,
  Settings,
  Help,
  Logout
} from '@mui/icons-material';

export const UserMenu = ({ anchorEl, onClose, user }) => {
  const handleMenuItemClick = (action) => {
    onClose();
    // Handle the specific action here
    console.log(`Action: ${action}`);
  };

  return (
    <Menu
      open={!!anchorEl}
      onClose={onClose}
      anchorEl={anchorEl}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 8,
        sx: {
          mt: 1,
          minWidth: 240,
          borderRadius: 2,
          '& .MuiMenuItem-root': {
            px: 2,
            py: 1.5,
            borderRadius: 1,
            mx: 1,
            mb: 0.5,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            '&:last-child': {
              mb: 1,
            }
          }
        }
      }}
    >
      {/* User Info Section */}
      <Box sx={{ px: 2, py: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: 'primary.main'
            }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.name || 'User Name'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || 'user@example.com'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mx: 1 }} />

      {/* Menu Items */}
      <MenuItem onClick={() => handleMenuItemClick('profile')}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2" fontWeight={500}>
            User Profile
          </Typography>
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('orders')}>
        <ListItemIcon>
          <ShoppingBag fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2" fontWeight={500}>
            My Orders
          </Typography>
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('settings')}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2" fontWeight={500}>
            Settings
          </Typography>
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('help')}>
        <ListItemIcon>
          <Help fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2" fontWeight={500}>
            Help & Support
          </Typography>
        </ListItemText>
      </MenuItem>

      <Divider sx={{ mx: 1, my: 1 }} />

      {/* Logout Section */}
      <MenuItem 
        onClick={() => handleMenuItemClick('logout')}
        sx={{ 
          color: 'error.main',
          '&:hover': {
            backgroundColor: 'error.light',
            color: 'error.dark',
          }
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" sx={{ color: 'inherit' }} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2" fontWeight={500}>
            Logout
          </Typography>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};