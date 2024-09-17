import React, { useEffect, useState, useRef } from "react";
import { ItemList } from "../components/ItemList/ItemList.js";
import 'firebase/firestore';
import Spinner from "../components/Spinner/Spinner";
import "./Home.scss";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase.js';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%', // Ancho completo
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0%',
      padding: theme.spacing(1), // Espaciado para dispositivos móviles
    },
  },
  offersContainer: {
    padding: '20px',
    backgroundColor: '#ffffff', // Color blanco para las ofertas
    textAlign: 'center',
    marginBottom: '20px',
    borderRadius: '8px', // Opcional: Añade bordes redondeados para un estilo más moderno
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Opcional: Añade sombra para destacar el contenedor
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  offersTitle: {
    fontSize: '2rem', // Tamaño de fuente para el título
    fontWeight: 'bold',
    color: '#333', // Color del texto
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem', // Tamaño de fuente en pantallas pequeñas
    },
  },
  separator: {
    height: '2px',
    backgroundColor: '#ffffff', // Color blanco para la línea de separación
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
      margin: '15px 0',
    },
  },
  itemListContainer: {
    padding: '20px',
    backgroundColor: '#f9f9f9', // Color de fondo para el listado completo
    borderRadius: '8px', // Opcional: Bordes redondeados
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Opcional: Sombra para el listado completo
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
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
    
    // Consultar ofertas
    const fetchOffers = async () => {
      const offerQuery = query(itemCollection, where('enOferta', '==', true)); // Asegúrate de que 'enOferta' sea el campo correcto
      const offerSnapshot = await getDocs(offerQuery);
      setOffers(offerSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })));
    };

    // Consultar todos los productos
    const fetchProducts = async () => {
      if (Id) {
        const itemQuery = query(itemCollection, where('categoria', '==', Id));
        const snapshot = await getDocs(itemQuery);
        setItems(snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        })));
      } else {
        const snapshot = await getDocs(itemCollection);
        setItems(snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        })));
      }
    };

    // Llamar a las funciones de consulta
    fetchOffers().then(() => fetchProducts()).finally(() => setLoading(false));

  }, [Id]);

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
                <div className={classes.offersContainer}>
                  <h1 className={classes.offersTitle}>Ofertas Especiales</h1>
                  <ItemList items={offers} /> {/* Mostrar ofertas aquí */}
                </div>
                <div className={classes.separator} /> {/* Línea de separación */}
                <div className={classes.itemListContainer}>
                  <ItemList items={items} />
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
