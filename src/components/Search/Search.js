import { useEffect, useState ,React} from "react";
import { ItemList } from "../ItemList/ItemList";
import 'firebase/firestore'
import Spinner from "../Spinner/Spinner";
import "./Home.scss";
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { collection, getDocs, getFirestore, query, where,doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APIs } from "../../constants/constants";
import Item from '../../components/carousel/Item'
/* import Item from '../components/carousel/Item'; */

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
   // Ancho completo
 // Espaciado por defecto
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height:'100%',
      margin:'0%',
      padding:'0%',
      padding: theme.spacing(1), // Espaciado para dispositivos móviles
    },
  },
}));

const Search = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([])

  const {name} = useParams();
  const navigate = useNavigate()
console.log("buscador",name);
useEffect(() => {
  const fetchProduct = async () => {
    try {
      const db = getFirestore();
      // La siguiente linea utiliza el metodo "collection" de Firebase para obtener una coleccion de productos
      // y luego utiliza el metodo "where" para filtrar los productos que tengan el nombre que coincide con el parametro "name"
      // pasado por la URL. La busqueda es case-insensitive (no distingue mayusculas de minusculas) gracias al metodo "toLowerCase()"
      // que se aplica al parametro "name". De esta forma, si el usuario busca por "MANZANAS" o "manzanas", el resultado sera el mismo.
      const q = query(collection(db, "productos"), where("productName", "in", [
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        name.toLowerCase(),
        name.toUpperCase(),
        name
      ]));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        if (productData.length > 0) {
          setProduct(productData[0]);
        } else {
          console.log('No product found');
        }
      } else {
        console.log('Query returned empty snapshot');
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  fetchProduct();
}, [name, navigate]);
console.log("buscador",product);




console.log("ITEMSSS FILTRADO todos los productos ",product);
  const classes = useStyles();

  return (
    <>
    {loading ? (
      <div>Loading...</div>
    ) : product.length === 0 ? (
      <div id="Home" className="home">
        <h1>No product found</h1>
      </div>
    ) : (
      <div className={classes.container}>
        <ItemList items={product ? [product] : []} />

      </div>
    )}
  </>
  );
};
export default Search;
