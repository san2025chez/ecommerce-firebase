import React, { createContext, useState, useContext, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Snackbar, Alert as MuiAlert, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { CartCntext2 } from './CartCntext2';

// Create context
export const NotificationContext = createContext();

// Colores por defecto
const DEFAULT_COLORS = {
  SUCCESS: '#00a650',
  WARNING: '#fff159',
  WARNING_TEXT: '#333333',
  WHITE: '#FFFFFF',
  BOX_SHADOW: '0 3px 6px rgba(0,0,0,0.16)'
};

// Provider component
export const NotificationProvider = ({ children }) => {
  const theme = useTheme();
  const [cartNotification, setCartNotification] = useState({
    open: false,
    message: '',
    product: null
  });
  
  const [shippingNotification, setShippingNotification] = useState({
    open: false,
    hasBeenShown: false
  });
  
  const cartContext = useContext(CartCntext2);
  const FREE_SHIPPING_THRESHOLD = 5000;

  useEffect(() => {
    // Check if cart total is above threshold and notification hasn't been shown yet
    if (cartContext && cartContext.totalCompra) {
      const cartTotal = cartContext.totalCompra();
      if (cartTotal > FREE_SHIPPING_THRESHOLD && !shippingNotification.hasBeenShown) {
        setShippingNotification({
          open: true,
          hasBeenShown: true
        });
      }
    }
  }, [cartContext, shippingNotification.hasBeenShown]);

  const showCartNotification = (product) => {
    setCartNotification({
      open: true,
      message: '¡Agregado al carrito!',
      product
    });
  };

  const hideCartNotification = () => {
    setCartNotification({
      ...cartNotification,
      open: false
    });
  };

  const hideShippingNotification = () => {
    setShippingNotification({
      ...shippingNotification,
      open: false
    });
  };

  const resetShippingNotification = () => {
    setShippingNotification({
      open: false,
      hasBeenShown: false
    });
  };

  // Estilos incorporados para no depender de styled-components con theme
  const cartAlertStyle = {
    backgroundColor: theme?.palette?.success?.main || DEFAULT_COLORS.SUCCESS,
    color: DEFAULT_COLORS.WHITE,
    padding: theme?.spacing?.(1, 2) || '8px 16px',
    borderRadius: theme?.shape?.borderRadius || 4,
    display: 'flex',
    alignItems: 'center',
    gap: theme?.spacing?.(1) || '8px',
    width: '100%',
    boxShadow: DEFAULT_COLORS.BOX_SHADOW,
  };

  const shippingAlertStyle = {
    backgroundColor: theme?.palette?.warning?.main || DEFAULT_COLORS.WARNING,
    color: theme?.palette?.warning?.contrastText || DEFAULT_COLORS.WARNING_TEXT,
    padding: theme?.spacing?.(1, 2) || '8px 16px',
    borderRadius: theme?.shape?.borderRadius || 4,
    display: 'flex',
    alignItems: 'center',
    gap: theme?.spacing?.(1) || '8px',
    width: '100%',
    boxShadow: DEFAULT_COLORS.BOX_SHADOW,
  };

  return (
    <NotificationContext.Provider
      value={{
        showCartNotification,
        hideCartNotification,
        resetShippingNotification
      }}
    >
      {children}
      
      {/* Cart notification */}
      <Snackbar
        open={cartNotification.open}
        autoHideDuration={3000}
        onClose={hideCartNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box sx={cartAlertStyle}>
          <ShoppingCartIcon />
          <Typography variant="body1" fontWeight={500}>
            {cartNotification.message}
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton
              size="small"
              color="inherit"
              onClick={hideCartNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Snackbar>
      
      {/* Free shipping notification */}
      <Snackbar
        open={shippingNotification.open}
        autoHideDuration={5000}
        onClose={hideShippingNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={shippingAlertStyle}>
          <LocalShippingIcon />
          <Typography variant="body1" fontWeight={500}>
            ¡ENVÍO GRATIS! En compras mayores a ${FREE_SHIPPING_THRESHOLD}
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton
              size="small"
              color="inherit"
              onClick={hideShippingNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
