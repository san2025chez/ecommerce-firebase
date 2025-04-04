import React, { useState, useEffect, useContext } from 'react';
import { Grid, Container, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProductCard from '../ProductCard/ProductCard';
import { CartCntext2 } from '../../context/CartCntext2';
import { useNotification } from '../../context/NotificationContext';

const ProductGrid = styled(Grid)(({ theme }) => ({
  margin: '0 auto',
  width: '100%',
  maxWidth: '1920px',
  [theme.breakpoints.up('xl')]: {
    maxWidth: '95%',
  }
}));

const ProductGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  }
}));

const NoProductsMessage = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 2px 0 rgba(0,0,0,.15)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  minHeight: '300px',
  padding: theme.spacing(4),
}));

export const ItemList = ({ items = [], loading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(true);
  const cartContext = useContext(CartCntext2);
  const { showCartNotification } = useNotification();

  useEffect(() => {
    if (!loading && items.length > 0) {
      setIsLoading(false);
    } else if (loading) {
      setIsLoading(true);
    }
  }, [loading, items]);

  const handleAddToCart = (product) => {
    if (cartContext && cartContext.addItem) {
      cartContext.addItem({
        ...product,
        quantity: 1
      });
      showCartNotification(product);
    }
  };

  const renderSkeletonCards = () => {
    return Array(8)
      .fill()
      .map((_, index) => (
        <ProductGridItem item xs={6} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
          <ProductCard loading={true} />
        </ProductGridItem>
      ));
  };

  return (
    <Container maxWidth={false} disableGutters>
      {isLoading ? (
        <LoadingContainer>
          <ProductGrid container>
            {renderSkeletonCards()}
          </ProductGrid>
        </LoadingContainer>
      ) : items.length > 0 ? (
        <ProductGrid container>
          {items.map((item) => {
            // Add free shipping status based on price and random rating data if not available
            const productWithShipping = {
              ...item,
              freeShipping: item.price >= 5000,
              rating: {
                value: item.rating?.value || (Math.floor(Math.random() * 5) + 1),
                count: item.rating?.count || Math.floor(Math.random() * 500) + 1
              }
            };

            return (
              <ProductGridItem item xs={6} sm={6} md={4} lg={3} key={item.id}>
                <ProductCard 
                  product={productWithShipping} 
                  onAddToCart={handleAddToCart}
                />
              </ProductGridItem>
            );
          })}
        </ProductGrid>
      ) : (
        <NoProductsMessage>
          <Typography variant="h6" component="h2">
            No se encontraron productos
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Intenta con otra categoría o busca algo diferente
          </Typography>
        </NoProductsMessage>
      )}
    </Container>
  );
};

export default ItemList;
