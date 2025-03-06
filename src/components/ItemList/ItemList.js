import React, { useState, useEffect } from 'react';
import Item from '../item/Item';
import { Grid, Container, Typography, Box, useTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5),
    }
  },
  gridContainer: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '1920px', 
    [theme.breakpoints.up('xl')]: {
      maxWidth: '95%', 
    }
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    transition: 'transform 0.3s ease-in-out',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5), 
    },
    '&:hover': {
      transform: 'translateY(-5px)',
    }
  },
  noProducts: {
    textAlign: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  }
}));

export const ItemList = ({ items = [], loading = false }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items.length > 0) {
      setIsLoading(false);
    }
  }, [items]);

  const loadingArray = Array(12).fill(null); 

  if (!items || items.length === 0) {
    return (
      <Container maxWidth="lg" className={classes.root}>
        <Box className={classes.noProducts}>
          <Typography variant="h5" component="h2" gutterBottom>
            No hay productos disponibles
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Por favor, intenta más tarde o revisa los filtros aplicados.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <div className={classes.root}>
      <Container 
        maxWidth={false} 
        disableGutters={true}
        sx={{ 
          [theme.breakpoints.down('sm')]: {
            padding: 0
          }
        }}
      >
        <Grid 
          container 
          spacing={2}
          className={classes.gridContainer}
        >
          {isLoading
            ? loadingArray.map((_, index) => (
                <Grid 
                  item 
                  xs={6}    // 2 columnas en móvil
                  sm={4}    // 3 columnas en tablet
                  md={2.4}  // 5 columnas en desktop mediano
                  lg={2}    // 6 columnas en desktop grande
                  key={index}
                  className={classes.gridItem}
                >
                  <Item loading={true} />
                </Grid>
              ))
            : items.map((item) => (
                <Grid 
                  item 
                  xs={6}    // 2 columnas en móvil
                  sm={4}    // 3 columnas en tablet
                  md={2.4}  // 5 columnas en desktop mediano
                  lg={2}    // 6 columnas en desktop grande
                  key={item.id}
                  className={classes.gridItem}
                >
                  <Item product={item} loading={false} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ItemList;
