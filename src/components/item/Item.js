import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardMedia, 
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Skeleton,
  Snackbar,
  Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import numeral from 'numeral';
import './item.scss';
import { CartContext } from '../../context/CartContext';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    maxWidth: 240,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      borderRadius: 8,
      margin: 0,
      backgroundColor: '#ffffff',
    },
  },
  mediaContainer: {
    position: 'relative',
    paddingTop: '100%',
    backgroundColor: '#ffffff',
  },
  media: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '8px',
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    }
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  badge: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: '#ff5252',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 600,
    fontSize: '0.875rem',
    zIndex: 1,
    boxShadow: '0 2px 8px rgba(255, 82, 82, 0.4)',
  },
  stock: {
    fontSize: '0.875rem',
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
  actions: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5, 1),
    }
  },
  iconButton: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.1)',
    },
    transition: 'all 0.2s ease',
  },
  categoryChip: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(4px)',
  },
}));

const Item = ({ product, loading = false }) => {
  const classes = useStyles();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { addItem } = useContext(CartContext);

  if (loading) {
    return (
      <Card className={classes.card}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </CardContent>
      </Card>
    );
  }

  if (!product) {
    return null;
  }

  const formattedPrice = numeral(product.price).format('$0,0').replace(/,/g, '.');

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevenir la navegación del Link
    e.stopPropagation(); // Evitar la propagación del evento
    
    try {
      addItem(product, 1);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Link to={`/detalle/${product.id}`} style={{ textDecoration: 'none' }}>
        <Card className={classes.card}>
          {product.discount > 0 && (
            <div className={classes.badge}>
              -{product.discount}% OFF
            </div>
          )}
          
          <Chip
            label={product.category}
            size="small"
            className={classes.categoryChip}
          />

          <div className={classes.mediaContainer}>
            {!isImageLoaded && (
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height="100%"
                style={{ position: 'absolute' }}
              />
            )}
            <CardMedia
              component="img"
              className={classes.media}
              image={product.img}
              alt={product.productName}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>

          <CardContent className={classes.content}>
            <Typography className={classes.title}>
              {product.productName}
            </Typography>
            
            <Typography className={classes.price}>
              {formattedPrice}
            </Typography>

            {product.stock > 0 ? (
              <Typography className={classes.stock} color="success">
                Stock disponible: {product.stock}
              </Typography>
            ) : (
              <Typography className={classes.stock} color="error">
                Sin stock
              </Typography>
            )}
          </CardContent>

          <CardActions className={classes.actions}>
            <Box>
              <IconButton 
                className={classes.iconButton} 
                size="small"
                onClick={(e) => e.preventDefault()}
              >
                <FavoriteIcon />
              </IconButton>
              {/* <IconButton 
                className={classes.iconButton} 
                size="small"
                onClick={(e) => e.preventDefault()}
              >
                <ShareIcon />
              </IconButton> */}
            </Box>
            <IconButton 
              className={classes.iconButton} 
              size="small"
              onClick={handleAddToCart}
              disabled={!product.stock}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.26)',
                }
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Link>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          ¡Producto agregado al carrito!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Item;
