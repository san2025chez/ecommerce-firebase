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
import { useNotification } from '../context/NotificationContext';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f7',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingBottom: theme.spacing(4),
    },
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
    padding: theme.spacing(2, 0),
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(3),
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 0),
      marginBottom: theme.spacing(2),
    },
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: theme.spacing(3),
    justifyItems: 'center',
    alignItems: 'start',
    padding: theme.spacing(2),
    margin: '0 auto',
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  categoryCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  iconButton: {
    width: '90px',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    padding: 0,
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transform: 'translateY(-2px)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70px',
      height: '70px',
    },
  },
  iconImages: {
    width: '60%',
    height: '60%',
    objectFit: 'contain',
    display: 'block',
    margin: 'auto',
  },
  iconLabel: {
    marginTop: theme.spacing(1),
    fontWeight: 500,
    color: theme.palette.text.primary,
    textAlign: 'center',
    display: 'block',
    width: '100%',
    fontSize: '0.9rem',
    lineHeight: 1.2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
      marginTop: theme.spacing(0.5),
    },
  },
  offersContainer: {
    backgroundColor: 'white',
    borderRadius: '20px',
    paddingTop: theme.spacing(4),
    padding: theme.spacing(4),
    marginBottom: theme.spacing(6),
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      borderRadius: '10px',
    },
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
  sectionTitle: {
    fontSize: '1.7rem',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  errorPaper: {
    padding: theme.spacing(4),
    backgroundColor: 'white',
    borderRadius: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  }
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { Id } = useParams();
  const isFirstRender = useRef(true);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { showCartNotification } = useNotification();

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
      <div className={classes.root}>
        <Container className={classes.container} style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <Spinner />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.root}>
        <Container className={classes.container}>
          <Paper className={classes.errorPaper}>
            <Typography variant="h5" color="error" gutterBottom>
              Error al cargar los productos
            </Typography>
            <Typography variant="body1">{error}</Typography>
          </Paper>
        </Container>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            className={classes.heroSection}
            sx={{
              background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${process.env.PUBLIC_URL}/hero-image.jpg) center/cover`,
            }}
          >
            <Box className={classes.heroContent}>
              <Typography
                variant="h1"
                className={classes.heroTitle}
                component="h1"
              >
                Bienvenido a Nuestra Tienda
              </Typography>
              <Typography variant="h5" className={classes.heroSubtitle}>
                Descubre los mejores productos con una experiencia renovada
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Categories Section */}
        <Fade in={true} timeout={800}>
          <Paper elevation={0} className={classes.categoriesSection}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ pt: 2, fontWeight: 'bold', color: '#333' }}
            >
              Categorías Populares
            </Typography>
            <Box className={classes.categoryGrid}>
              {categories.map((category) => (
                <Box key={category.name} component="div">
                  <Link
                    to={category.path}
                    style={{ textDecoration: "none" }}
                  >
                    <Paper elevation={0} className={classes.categoryCard}>
                      <IconButton className={classes.iconButton}>
                        <img
                          src={category.icon}
                          alt={category.name}
                          className={classes.iconImages}
                        />
                      </IconButton>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{ mt: 1, fontWeight: 500 }}
                      >
                        {category.name}
                      </Typography>
                    </Paper>
                  </Link>
                </Box>
              ))}
            </Box>
          </Paper>
        </Fade>

        {/* Product section title */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2
              }
            }}
          >
            {Id ? `Productos en ${Id}` : 'Todos los Productos'}
          </Typography>
        </Box>

        {/* Improved product listing */}
        <ItemList items={items} loading={loading} />
      </Container>
    </div>
  );
};

export default Home;
