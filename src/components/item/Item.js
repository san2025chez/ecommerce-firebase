import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';
import './item.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    maxWidth: 350,
    height: 'auto',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 12,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 280,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 220,
    },
  },
  media: {
    width: '100%',
    height: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  },
  header: {
    textAlign: 'center',
    padding: '12px 20px',
  },
  price: {
   /*  marginBottom: '0.5rem', */
    color: '#000', // Changed the color to black
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff5252',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    fontSize: '0.8rem',
    flexDirection: 'column',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },
  loading: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#f7f7f7',
  },
}));

const Item = ({ product, loading }) => {
  const classes = useStyles();

  const formattedPrice = numeral(product.price).format('$0,0').replace(/,/g, '.');

  return (
    <Link to={`/detalle/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress className={classes.spinner} />
            <Typography variant="body2" color="textSecondary">
              Cargando...
            </Typography>
          </div>
        ) : (
          <div>
          {/*   {product.enOferta && (
              <div className={classes.badge}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  50%
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  OFF
                </div>
              </div>
            )} */}
            <div className={classes.media}>
              <img
                src={product.img}
                alt={product.productName}
                className={classes.img}
              />
            </div>
            <CardHeader
              className={classes.header}
              disableTypography
             
             title={
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                  <Typography variant="body2" className={classes.price}>
                    {formattedPrice}
                  </Typography>
                  {product.enOferta && (
                    <Typography
                      variant="body2"
                      style={{ fontSize: '0.8rem', fontWeight: 'lighter', marginLeft: '0.9rem', color:'#00a650' }}
                    >
                      20% OFF
                    </Typography>
                  )}
                </div>
              }
              subheader={
                <Typography variant="body1" color="textPrimary">
                  {product.productName}
                </Typography>
              }
            />
          </div>
        )}
      </Card>
    </Link>
  );
};

export default Item;




