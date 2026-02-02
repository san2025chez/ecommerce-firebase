import { useEffect, useState ,React} from "react";
import { ItemList } from "../ItemList/ItemList";
import Spinner from "../Spinner/Spinner";
import "./Home.scss";
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APIs } from "../../constants/constants";
import Item from '../../components/carousel/Item'
import { client } from "../../supabase/client";
import { mapSupabaseProduct } from "../../supabase/mappers";
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
      // Busqueda en Supabase usando ilike para case-insensitive
      // Busca coincidencias en el campo "nombre" de la tabla utiles
      const { data, error } = await client
        .from('utiles')
        .select('*')
        .ilike('nombre', `%${name}%`);

      if (error) throw error;

      if (data && data.length > 0) {
        setProduct(mapSupabaseProduct(data[0]));
      } else {
        console.log('No product found');
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
