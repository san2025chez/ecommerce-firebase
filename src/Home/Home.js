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
            

            <section className={classes.categoriesSection}>
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
                <Typography variant="h3" className={classes.sectionTitle}>
                  Ofertas Especiales
                </Typography>
                <ItemList items={offers} />
              </section>

              <section className={classes.productsContainer}>
                <Typography variant="h3" className={classes.sectionTitle}>
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
