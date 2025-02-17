import * as React from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Home from '../../Home/Home';
import dxn from '../assets/DistributorsDXN.jpg';
import dxn1 from '../assets/banner-frutas.jpg';
/* import fig1 from '../assets/fruits.jpg'; */
import fig2 from '../assets/Slider_nightrace.webp';
import fig3 from '../assets/Slider_Nutre_Deporte_claimer.png';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const mock = [
  /* {
    id: 4,
    nombre: 'Imagen 4',
    imagen: fig1,
  }, */
  {
    id: 5,
    nombre: 'Imagen 5',
    imagen: fig2,
  },
  {
    id: 6,
    nombre: 'Imagen 6',
    imagen: fig3,
  },
  {
    id: 1,
    nombre: 'Imagen 1',
    imagen: dxn1,
  },
 /*  {
    id: 8,
    nombre: 'Imagen 8',
    imagen: dxn,
  }, */
];

const useStyles = makeStyles((theme) => ({
  stylegrid: {
    marginBottom: '70px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
      paddingTop: 0,
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0px',
    },
  },
  fullWidthImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition:'bottom'
  },
  carouselContainer: {
    width: '100%',
    height: '550px',
    [theme.breakpoints.down('sm')]: {
      height: '350px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '180px',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'black',
    overflowX: 'hidden', //agregue esta linea
  },

}));

function Carousel1() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
 

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ width: '100%', px: 0 }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: 'white' }}
      >
        <Grid item xs={12} sm={6} md={8}>
          <Box className={classes.carouselContainer}>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {mock.map((step, index) => (
                <div key={step.id} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      className={classes.fullWidthImage}
                      src={step.imagen}
                      alt={step.id}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
          </Box>
          <Grid className={classes.stylegrid}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
       
    </Container>
  );
}

function HomePage() {
  return (
    <>
      <Carousel1 />

      <div style={{ margin: '20px 0' }}></div>
      
      <Home />
    </>
  );
}

export default HomePage;

