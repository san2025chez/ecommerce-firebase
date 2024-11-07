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
    maxWidth: 300,
    height: 'auto',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    boxShadow: 'none', // Remove shadow to eliminate border effect
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 200,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 180,
    },
  },
  media: {
    paddingTop: '10px',
    width: '100%',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  },
  header: {
    textAlign: 'center',
    padding: '8px 16px',
  },
  price: {
    marginBottom: '0.5rem',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 4,
    [theme.breakpoints.down('xs')]: {
      right: 0,
      width: 60,
      height: 60,
    },
    backgroundColor: 'yellow',
    color: 'black',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    fontSize: '0.9rem',
    flexDirection: 'column',
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
  },
}));

const Item = ({ product, loading }) => {
  const classes = useStyles();

  const formattedPrice = numeral(product.price).format('$0,0').replace(/,/g, '.');

  return (
    <Link to={`/detalle/${product.id}`}>
      <Card className={classes.card}>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress className={classes.spinner} />
            <Typography variant="body2" color="black">
              Cargando...
            </Typography>
          </div>
        ) : (
          <div>
            {product.enOferta ? (
              <div className={classes.badge}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  50%
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  OFF
                </div>
              </div>
            ) : null}
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
                <Typography variant="body2" color="black">
                  {product.productName}
                </Typography>
              }
              subheader={
                <Typography variant="body2" className={classes.price}>
                  {formattedPrice}
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


