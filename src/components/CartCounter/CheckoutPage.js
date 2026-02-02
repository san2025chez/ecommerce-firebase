import React from 'react';
import {useState, useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CheckoutCard from './CheckoutCard';
import Total from './Total'
import { client } from '../../supabase/client';
import { mapSupabaseProducts } from '../../supabase/mappers';


const useStyles = makeStyles((theme) =>({
    root:{
        flexGrow:1,
        padding:"2rem",
    },
}))
export const CheckoutPage=()=>{
    const classes = useStyles();
   const [items, setItems] = useState([])
   
      useEffect(() => {
          const fetchProducts = async () => {
            try {
              const { data, error } = await client
                .from('utiles')
                .select('*');
              
              if (error) throw error;
              
              console.log("se consultaron los datos");
              console.log(data);
              if(data && data.length > 0){
                console.log("comprobando", data);
                setItems(mapSupabaseProducts(data));
              }
            } catch (error) {
              console.error("Error fetching products:", error);
            }
          };
          
          fetchProducts();
        },[]);


    function FormRow(){
        return(
            <React.Fragment>

                {items.map((item)=>(
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                         <CheckoutCard key={item.id } product={item}/>
                    </Grid>
                ))}
            </React.Fragment>
        );

    }

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom variant='h4'>
                        ShoppingCart
                    </Typography>

                </Grid>
                <Grid item xs={12} sm={8} md={9} container spacing={2}>
                    <FormRow/>
                </Grid>
                <Grid item xs={12} sm={4} md={3} >
                <Typography align='center' gutterBottom variant='h4'>
                    <Total/>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}