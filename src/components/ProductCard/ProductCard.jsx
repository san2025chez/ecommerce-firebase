import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  IconButton,
  Skeleton,
  useMediaQuery,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import numeral from 'numeral';

// Colores constantes para cuando el tema no está disponible
const DEFAULT_COLORS = {
  PRIMARY: '#3483fa',
  PRIMARY_DARK: '#0056c7',
  SECONDARY: '#ff7733',
  SUCCESS: '#00a650',
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666',
  WHITE: '#FFFFFF',
  BACKGROUND: '#f5f5f5',
  RATING_STAR: '#3483fa'
};

// Styled components
const ProductCardWrapper = styled(Card)({
  maxWidth: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 1px 2px 0 rgba(0,0,0,.15)',
  transition: 'all 300ms',
  borderRadius: 8,
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 4px 12px 0 rgba(0,0,0,.2)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
});

const ProductImageWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  paddingTop: '100%', // 1:1 Aspect ratio
  overflow: 'hidden',
});

const ProductImage = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '16px',
  transition: 'transform 300ms',
});

const DiscountBadge = styled(Chip)({
  position: 'absolute',
  top: 12,
  left: 12,
  backgroundColor: DEFAULT_COLORS.SECONDARY,
  color: DEFAULT_COLORS.WHITE,
  fontWeight: 700,
  zIndex: 1,
});

const ProductContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flexGrow: 1,
  padding: '16px',
});

// Título del producto con soporte responsive
const ProductTitle = styled(Typography)(({ theme, isMobile }) => ({
  fontSize: isMobile ? 14 : 16,
  fontWeight: 400,
  color: DEFAULT_COLORS.TEXT_PRIMARY,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  height: isMobile ? 40 : 44,
  marginBottom: '8px',
  lineHeight: 1.25,
}));

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '4px',
});

// Precio con soporte responsive
const Price = styled(Typography)(({ isMobile }) => ({
  fontSize: isMobile ? 20 : 24,
  fontWeight: 400,
  color: DEFAULT_COLORS.TEXT_PRIMARY,
}));

const OriginalPrice = styled(Typography)(({ isMobile }) => ({
  fontSize: isMobile ? 12 : 14,
  fontWeight: 400,
  color: DEFAULT_COLORS.TEXT_SECONDARY,
  textDecoration: 'line-through',
}));

const DiscountLabel = styled(Typography)(({ isMobile }) => ({
  fontSize: isMobile ? 12 : 14,
  fontWeight: 600,
  color: DEFAULT_COLORS.SECONDARY,
  marginLeft: '4px',
}));

const FreeShippingText = styled(Typography)(({ isMobile }) => ({
  fontSize: isMobile ? 11 : 13,
  fontWeight: 700,
  color: DEFAULT_COLORS.SUCCESS,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginTop: '2px',
}));

const ProductFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
  paddingTop: '8px',
});

const RatingContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const RatingsCount = styled(Typography)(({ isMobile }) => ({
  fontSize: isMobile ? 12 : 14,
  color: DEFAULT_COLORS.TEXT_SECONDARY,
}));

const CartButton = styled(IconButton)({
  backgroundColor: DEFAULT_COLORS.PRIMARY,
  color: DEFAULT_COLORS.WHITE,
  transition: 'all 300ms',
  '&:hover': {
    backgroundColor: DEFAULT_COLORS.PRIMARY_DARK,
    transform: 'scale(1.02)',
  },
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const ProductCard = ({ 
  product, 
  onAddToCart, 
  loading = false 
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) {
    return (
      <ProductCardWrapper>
        <LoadingContainer>
          <ProductImageWrapper>
            <Skeleton variant="rectangular" width="100%" height="100%" style={{ position: 'absolute' }} />
          </ProductImageWrapper>
          <ProductContent>
            <Skeleton variant="text" width="100%" height={40} />
            <Skeleton variant="text" width="70%" height={35} />
            <Skeleton variant="text" width="50%" height={24} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="circular" width={40} height={40} />
            </Box>
          </ProductContent>
        </LoadingContainer>
      </ProductCardWrapper>
    );
  }

  if (!product) return null;

  const {
    id,
    productName,
    price,
    img,
    discount = 0,
    freeShipping = false,
    rating = { value: 0, count: 0 }
  } = product;

  const formattedPrice = numeral(price).format('$0,0');
  const originalPrice = discount > 0 ? numeral(price / (1 - discount / 100)).format('$0,0') : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Link to={`/detalle/${id}`} style={{ textDecoration: 'none' }}>
      <ProductCardWrapper>
        <ProductImageWrapper>
          {!isImageLoaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              style={{ position: 'absolute' }}
            />
          )}
          
          {discount > 0 && (
            <DiscountBadge
              label={`${discount}% OFF`}
              size="small"
            />
          )}
          
          <ProductImage
            component="img"
            image={img}
            alt={productName}
            onLoad={() => setIsImageLoaded(true)}
          />
        </ProductImageWrapper>
        
        <ProductContent>
          <ProductTitle isMobile={isMobile}>
            {productName}
          </ProductTitle>
          
          <Box>
            <PriceContainer>
              <Price isMobile={isMobile}>{formattedPrice}</Price>
              {discount > 0 && (
                <DiscountLabel isMobile={isMobile}>{`${discount}% OFF`}</DiscountLabel>
              )}
            </PriceContainer>
            
            {originalPrice && (
              <OriginalPrice isMobile={isMobile}>{originalPrice}</OriginalPrice>
            )}
            
            {freeShipping && (
              <FreeShippingText isMobile={isMobile}>
                <LocalShippingIcon sx={{ fontSize: isMobile ? 14 : 16 }} />
                Envío gratis
              </FreeShippingText>
            )}
          </Box>
          
          <ProductFooter>
            <RatingContainer>
              <Rating
                name="product-rating"
                value={rating.value}
                precision={0.5}
                size={isMobile ? "small" : "small"}
                readOnly
                sx={{ color: theme?.palette?.primary?.main || DEFAULT_COLORS.RATING_STAR }}
              />
              <RatingsCount isMobile={isMobile}>({rating.count})</RatingsCount>
            </RatingContainer>
            
            <CartButton
              size="small"
              onClick={handleAddToCart}
              aria-label="add to cart"
              sx={{
                bgcolor: theme && theme.palette ? theme.palette.primary.main : DEFAULT_COLORS.PRIMARY,
                color: DEFAULT_COLORS.WHITE,
                '&:hover': {
                  bgcolor: theme && theme.palette ? theme.palette.primary.dark : DEFAULT_COLORS.PRIMARY_DARK,
                },
              }}
            >
              <ShoppingCartIcon fontSize={isMobile ? "small" : "small"} />
            </CartButton>
          </ProductFooter>
        </ProductContent>
      </ProductCardWrapper>
    </Link>
  );
};

export default ProductCard;
