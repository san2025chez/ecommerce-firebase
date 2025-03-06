import React, { useEffect, useState, useRef } from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import 'firebase/firestore';
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase.js';
import { 
  IconButton, 
  Typography, 
  Container, 
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Box,
  Fade
} from "@material-ui/core";
import { motion } from "framer-motion";
import fruta from '../../src/components/assets/category/fruta.png';
import comida from '../../src/components/assets/category/comida.png';
import lacteos from '../../src/components/assets/category/lacteos.png';
import { Link } from 'react-router-dom';
import utiles from '../../src/components/assets/category/cuadernos.png';
import novedad from '../../src/components/assets/category/etiqueta.png';
import regalos from '../../src/components/assets/category/regalos.png';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f7',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  container: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  heroSection: {
    position: 'relative',
    height: '300px',
    marginBottom: theme.spacing(6),
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '200px',
    },
  },
  heroContent: {
    zIndex: 1,
    padding: theme.spacing(3),
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  categoriesSection: {
    marginBottom: theme.spacing(6),
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    },
  },
  categoryCard: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: '16px',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
    },
  },
  iconButton: {
    width: '80px',
    height: '80px',
    marginBottom: theme.spacing(1),
    backgroundColor: '#f8f9fa',
    '&:hover': {
      backgroundColor: '#e9ecef',
    },
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
    },
  },
  iconImages: {
    width: '60%',
    height: '60%',
    objectFit: 'contain',
  },
  iconLabel: {
    marginTop: theme.spacing(1),
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 600,
    marginBottom: theme.spacing(4),
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: 0,
      width: '60px',
      height: '4px',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '2px',
    },
  },
  offersContainer: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(6),
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  productsContainer: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: theme.spacing(4),
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      borderRadius: '12px',
    }
  },
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Id } = useParams();
  const isFirstRender = useRef(true);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const categories = [
    { name: 'Verduras', icon: comida, path: '/categoria/Verduras' },
    { name: 'Frutas', icon: fruta, path: '/categoria/Frutas' },
    { name: 'Productos', icon: lacteos, path: '/categoria/Productos' },
    { name: 'Regalería', icon: regalos, path: '/categoria/Regaleria' },
    { name: 'Novedades', icon: novedad, path: '/categoria/Novedades' },
    { name: 'Útiles Escolares', icon: utiles, path: '/categoria/Utiles' },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner />
      </Box>
    );
  }
  console.log("veo productos",items);
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        {Id ? (
          <Fade in timeout={1000}>
            <div className={classes.productsContainer}>
              <ItemList items={items} />
            </div>
          </Fade>
        ) : (
          <>
            <motion.div 
              className={classes.heroSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={classes.heroContent}>
                <Typography variant="h1" className={classes.heroTitle}>
                  Bienvenido a tu Tienda Online
                </Typography>
                <Typography variant="h2" className={classes.heroSubtitle}>
                  Descubre productos frescos y de calidad
                </Typography>
              </div>
            </motion.div>

            <section className={classes.categoriesSection}>
              <Typography variant="h2" className={classes.sectionTitle}>
                Categorías
              </Typography>
              <Grid container className={classes.categoryGrid}>
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={category.path} style={{ textDecoration: 'none' }}>
                      <Paper className={classes.categoryCard}>
                        <IconButton className={classes.iconButton}>
                          <img src={category.icon} alt={category.name} className={classes.iconImages} />
                        </IconButton>
                        <Typography variant="subtitle1" className={classes.iconLabel}>
                          {category.name}
                        </Typography>
                      </Paper>
                    </Link>
                  </motion.div>
                ))}
              </Grid>
            </section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <section className={classes.offersContainer}>
                <Typography variant="h2" className={classes.sectionTitle}>
                  Ofertas Especiales
                </Typography>
                <ItemList items={offers} />
              </section>

              <section className={classes.productsContainer}>
                <Typography variant="h2" className={classes.sectionTitle}>
                  Productos Destacados
                </Typography>
                <ItemList items={items} />
              </section>
            </motion.div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
