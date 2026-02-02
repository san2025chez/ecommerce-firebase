import React, { useEffect, useState, useRef } from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { client } from '../supabase/client';
import { mapSupabaseProducts } from '../supabase/mappers';
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
    background: 'radial-gradient(1200px 600px at 20% -10%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(900px 500px at 100% 0%, rgba(99,102,241,0.12), transparent 55%), #f7f8fb',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
    },
  },
  container: {
    width: '100%',
    maxWidth: '1320px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  heroSection: {
    position: 'relative',
    height: '300px',
    marginBottom: theme.spacing(6),
    borderRadius: theme.spacing(3),
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 55%, #e0f2fe 100%)',
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
    [theme.breakpoints.down('sm')]: {
      height: '200px',
    },
  },
  heroContent: {
    zIndex: 1,
    padding: theme.spacing(3),
    maxWidth: 720,
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    letterSpacing: '-0.5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.75,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  categoriesSection: {
    padding: theme.spacing(2.5, 0),
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: theme.spacing(2.5),
    marginBottom: theme.spacing(3),
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(15, 23, 42, 0.06)',
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
    maxWidth: '1100px',
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
    backgroundColor: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)',
    transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
    '&:hover': {
      transform: 'translateY(-6px)',
      borderColor: 'rgba(59,130,246,0.4)',
      boxShadow: '0 14px 28px rgba(15, 23, 42, 0.16)',
    },
  },
  iconButton: {
    width: '90px',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    padding: 0,
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0 14px 28px rgba(15, 23, 42, 0.16)',
      transform: 'translateY(-2px) scale(1.02)',
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
      fontSize: '0.4rem',
      marginTop: theme.spacing(0.5),
    },
  },
  offersContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: '24px',
    paddingTop: theme.spacing(4),
    padding: theme.spacing(4),
    marginBottom: theme.spacing(6),
    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
    border: '1px solid rgba(15, 23, 42, 0.06)',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      borderRadius: '12px',
    },
  },
  productsContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: '24px',
    padding: theme.spacing(4),
    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
    border: '1px solid rgba(15, 23, 42, 0.06)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      borderRadius: '12px',
    }
  },
  sectionTitle: {
    fontSize: '1.7rem',
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: 0,
      width: '60px',
      height: '4px',
      background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
      borderRadius: '2px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  errorPaper: {
    padding: theme.spacing(4),
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(2.5),
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
  }
}));

const Home = () => {
  const [items, setItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { Id } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  console.log("✅ Home mounted, loading:", loading);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        console.log("🔄 Iniciando carga de datos desde Supabase...");
        setLoading(true);
        setError(null);

        // Fetch todos los productos (sin .single() porque queremos múltiples registros)
        const { data: allData, error: fetchError } = await client
          .from('utiles')
          .select('*');
         
        console.log("📦 DATOS CRUDOS de Supabase:", allData);
        console.log("📊 Tipo de dato:", Array.isArray(allData) ? 'Array' : typeof allData);
        console.log("🔢 Cantidad de registros:", allData?.length || 0);

        if (fetchError) {
          console.error("❌ Error de Supabase:", fetchError);
          throw fetchError;
        }

        if (!isMounted) return;

        // Si no hay datos
        if (!allData || !Array.isArray(allData) || allData.length === 0) {
          console.warn("⚠️ No hay datos en la tabla 'utiles'");
          console.log("💡 Posibles causas:");
          console.log("   1. La tabla está vacía");
          console.log("   2. RLS (Row Level Security) está bloqueando el acceso");
          console.log("   3. El nombre de la tabla es incorrecto");
          setItems([]);
          setOffers([]);
          setLoading(false);
          return;
        }

        // Mapear productos
        console.log("🔄 Mapeando productos...");
        const mappedProducts = mapSupabaseProducts(allData);
        console.log("✅ Productos mapeados:", mappedProducts.length);
        console.log("📋 Primer producto mapeado:", mappedProducts[0]);

        // Filtrar por categoría si existe
        let filteredItems = mappedProducts;
        if (Id) {
          console.log(`🔍 Filtrando por categoría: "${Id}"`);
          filteredItems = mappedProducts.filter(item => item.categoria === Id);
          console.log(`📦 Filtrado por categoría "${Id}":`, filteredItems.length, "productos");
          if (filteredItems.length === 0) {
            console.warn(`⚠️ No hay productos en la categoría "${Id}"`);
            console.log("📋 Categorías disponibles:", [...new Set(mappedProducts.map(p => p.categoria))]);
          }
        } else {
          console.log("📦 Mostrando todos los productos (sin filtro de categoría)");
        }

        // Filtrar ofertas (si existe el campo enOferta)
        const offersData = mappedProducts.filter(item => item.enOferta === true);
        console.log("🎉 Ofertas encontradas:", offersData.length);
        if (offersData.length > 0) {
          console.log("🎁 Primera oferta:", offersData[0]);
        }

        setItems(filteredItems);
        setOffers(offersData);
        
        console.log("✅ Estado actualizado:");
        console.log("   - Items a mostrar:", filteredItems.length);
        console.log("   - Ofertas:", offersData.length);
        
      } catch (err) {
        console.error('❌ Error fatal:', err);
        if (isMounted) {
          setError(err.message || 'Error al cargar productos');
          setItems([]);
          setOffers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log("✅ Carga completada");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
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
              background: `linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(238,242,255,0.9) 55%, rgba(224,242,254,0.9) 100%), url(${process.env.PUBLIC_URL}/hero-image.jpg) center/cover`,
            }}
          >
            <Box className={classes.heroContent}>
              <Typography
                variant={isMobile ? "h4" : "h1"}
                className={classes.heroTitle}
                component="h1"
                sx={{ fontSize: isMobile ? '1.2rem' : '2.5rem' }}
              >
                Bienvenido a Nuestra Tienda
              </Typography>
              <Typography
                variant="h6"
                className={classes.heroSubtitle}
                sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}
              >
                Descubre los mejores productos con una experiencia renovada
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Categories Section */}
        <Fade in={true} timeout={800}>
          <Paper elevation={0} className={classes.categoriesSection}>
            <Typography
              variant={isMobile ? "h6" : "h4"}
              align="center"
              gutterBottom
              sx={{ pt: 2, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px' }}
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
                        variant="subtitle2"
                        align="center"
                        sx={{ mt: 1, fontWeight: 500, fontSize: '0.8rem' }}
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
            variant={isMobile ? "h6" : "h4"} 
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
