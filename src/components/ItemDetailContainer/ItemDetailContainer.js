import { React } from 'react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'
import './ItemDetailContainer.scss'
import axios from 'axios';
import { APIs } from '../../constants/constants'
import { ItemDetail2 } from '../ItemDetail/ItemDetail2';
import { Box, styled } from '@mui/material';
import { client } from '../../supabase/client';
import { mapSupabaseProduct } from '../../supabase/mappers';

// Contenedor para centrar el spinner
const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: '60vh',
});

const ItemDetailContainer = () => {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data, error } = await client
                    .from('utiles')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                setProduct(mapSupabaseProduct(data));
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos", error);
                setLoading(false);
            }
        };
        
        fetchProduct();
    }, [id])
    console.log("productos item detail conteiner", { ...product });

    return (
        <div>
            {loading ? (
                <LoadingContainer>
                    <Spinner />
                </LoadingContainer>
            ) : (
                <ItemDetail2 product={product}></ItemDetail2>
            )}
        </div>
    )
}
export default ItemDetailContainer
