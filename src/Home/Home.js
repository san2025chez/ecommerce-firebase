import React, { useEffect, useState, useRef } from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import 'firebase/firestore';
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase.js';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import fruta from '../../src/components/assets/category/fruta.png';
import comida from '../../src/components/assets/category/comida.png';
import lacteos from '../../src/components/assets/category/lacteos.png';
import { Link } from 'react-router-dom';
import utiles from '../../src/components/assets/category/cuadernos.png';
import novedad from '../../src/components/assets/category/etiqueta.png';
import regalos from '../../src/components/assets/category/regalos.png';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0%',
      padding: theme.spacing(1),
    },
  },
  offersContainer: {
  
    paddingTop: '20px',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  offersTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  separator: {
    height: '2px',
    backgroundColor: '#ffffff',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
      margin: '15px 0',
    },
  },
  itemListContainer: {
    padding: '5px',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      backgroundColor: '#FFFFFF',
    },
  },
  
  iconRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '50px', // Espacio entre iconos en escritorio
    marginBottom: '20px',
    flexWrap: 'wrap', // Permite que los elementos se envuelvan en varias filas
    [theme.breakpoints.down('sm')]: {
      gap: '10px', // Espacio entre iconos en móviles
      justifyContent: 'space-between', // Distribuye el espacio entre los iconos
    },
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(33.33% - 10px)', // Cada icono ocupa un tercio del ancho en móviles
      marginBottom: '10px', // Espacio entre filas en móviles
    },
  },
  iconButton: {
    borderRadius: '80%',
    padding: '25px',
    backgroundColor: '#f0f0f0',
    '&:hover': {
      backgroundColor: '#ddd',
    },
    width: '100px',
    height: '100px',
    [theme.breakpoints.down('sm')]: {
      width: '70px', // Tamaño reducido para móviles
      height: '70px',
    },
  },
  iconImages: {
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    [theme.breakpoints.down('sm')]: {
      width: '50px', // Tamaño reducido para móviles
      height: '50px',
    },
  },
  iconLabel: {
    fontSize: '0.8rem',
    textAlign: 'center',
    marginTop: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Id } = useParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const itemCollection = collection(db, "productos");

    const fetchOffers = async () => {
      const offerQuery = query(itemCollection, where('enOferta', '==', true));
      const offerSnapshot = await getDocs(offerQuery);
      setOffers(offerSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })));
    };

    const fetchProducts = async () => {
      if (Id) {
        const itemQuery = query(itemCollection, where('categoria', '==', Id));
        const snapshot = await getDocs(itemQuery);
        setItems(snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        })));
      } else {
        const productQuery = query(itemCollection, where('categoria', '==', 'Productos'));
        const productsSnapshot = await getDocs(productQuery);
        setItems(productsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        })));
      }
    };

    fetchOffers().then(() => fetchProducts()).finally(() => setLoading(false));

  }, [Id]);

  const handleCategoryClick = (category) => {
    console.log("Categoría seleccionada:", category);
  };

  const classes = useStyles();

  return (
    <>
      {loading ? (
        <div id="Home" className="home">
          <Spinner />
        </div>
      ) : (
        <div className={classes.container}>
          {
            Id ? (
              <div className={classes.itemListContainer}>
                <ItemList items={items} />
              </div>
            ) : (
              <>
                <div className={classes.iconRow}>
                  <div className={classes.iconContainer}>
                  <Link to={`/categoria/Verduras`}>
                                          
                    <IconButton className={classes.iconButton} onClick={() => handleCategoryClick('productos')}>
                      <img src={comida} alt="Comida" className={classes.iconImages} />
                    </IconButton>

                    </Link> 
                    <Typography variant="caption" className={classes.iconLabel}>Verduras</Typography>
                 </div>
                  <div className={classes.iconContainer}>
                      <Link to={`/categoria/Frutas`}>
                    <IconButton className={classes.iconButton} onClick={() => handleCategoryClick('ofertas')}>
                      <img src={fruta} alt="Ofertas" className={classes.iconImages} />
                    </IconButton>
                    </Link>
                    <Typography variant="caption" className={classes.iconLabel}>Frutas</Typography>
                  
                  </div>
                  <div className={classes.iconContainer}>
                  <Link to={`/categoria/Productos`}>
                    <IconButton className={classes.iconButton} onClick={() => handleCategoryClick('nutricionales')}>
                      <img src={lacteos} alt="Nutricionales" className={classes.iconImages} />
                    </IconButton>
                    </Link>
                    <Typography variant="caption" className={classes.iconLabel}>Productos</Typography>
                  </div>
                  <div className={classes.iconContainer}>
                  <Link to={`/categoria/Regaleria`}>
                    <IconButton className={classes.iconButton} onClick={() => handleCategoryClick('productos')}>
                      <img src={regalos} alt="Comida" className={classes.iconImages} />
                    </IconButton>
                    </Link>
                    <Typography variant="caption" className={classes.iconLabel}>Regaleria</Typography>
                  </div>
                  <div className={classes.iconContainer}>
                  <Link to={`/categoria/Novedades`}>
                    <IconButton className={classes.iconButton} onClick={() => handleCategoryClick('ofertas')}>
                      <img src={novedad} alt="Ofertas" className={classes.iconImages} />
                    </IconButton>
                    </Link>
                    <Typography variant="caption" className={classes.iconLabel}>Novedades</Typography>
                  </div>
                  <div className={classes.iconContainer}>
                    <IconButton className={classes.iconButton} onClick={() => handleCategoryClick('nutricionales')}>
                      <img src={utiles} alt="Nutricionales" className={classes.iconImages} />
                    </IconButton>
                    <Typography variant="caption" className={classes.iconLabel}>Utiles Escolares</Typography>
                  </div>
                </div>

                <div className={classes.offersContainer}>
                  <h1 className={classes.offersTitle}>Ofertas Especiales</h1>
                  <ItemList items={offers} />
                  <div className={classes.separator} />
                  <div className={classes.itemListContainer}>
                    <h1 className={classes.offersTitle}>Productos Nutricionales</h1>
                    <ItemList items={items} />
                  </div>
                </div>
              </>
            )
          }
        </div>
      )}
    </>
  );
};

export default Home;
