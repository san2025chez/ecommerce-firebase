import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';
import './item.scss';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%', // Ancho total
    maxWidth: 300, // Ancho máximo
    height: 'auto', // Altura automática para que se ajuste al contenido
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 200,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 180,
    },
  },
  media: {
    paddingTop: '10px',
    width: '100%', // Asegúrate de que ocupa el ancho completo
    height: '200px', // Altura fija para mantener la consistencia
    display: 'flex', // Habilita flexbox
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center', // Centra verticalmente
    overflow: 'hidden', // Oculta cualquier contenido desbordante
  },
  img: {
    maxWidth: '100%', // Asegura que la imagen no exceda el ancho del contenedor
    maxHeight: '100%', // Asegura que la imagen no exceda la altura del contenedor
    objectFit: 'cover', // Mantiene la relación de aspecto de la imagen
  },
  header: {
    textAlign: 'center',
    padding: '8px 16px',
  },
  price: {
    marginBottom: '0.5rem',
  },
}));

const Item = ({ product }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // Formatear el precio con puntos como separadores de miles
  const formattedPrice = numeral(product.price).format('$0,0').replace(/,/g, '.');

  return (
    <Link to={`/detalle/${product.id}`}>
      <Card className={classes.card}>
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
          title={<Typography variant="body2" color="black">{product.productName}</Typography>}
          subheader={
            <>
              <Typography variant="body2" className={classes.price}>
                {formattedPrice}
              </Typography>
            </>
          }
        />
      </Card>
    </Link>
  );
};

export default Item;
