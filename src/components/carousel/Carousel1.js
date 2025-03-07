import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  Container, 
  Grid, 
  Box, 
  Typography,
  IconButton,
  useMediaQuery,
  Paper,
  Fade,
  LinearProgress
} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Home from '../../Home/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dxn from '../assets/DistributorsDXN.jpg';
import dxn1 from '../assets/banner-frutas.jpg';
import fig2 from '../assets/Slider_nightrace.webp';
import fig3 from '../assets/Slider_Nutre_Deporte_claimer.png';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const slides = [
  {
    id: 1,
    title: "Productos Frescos",
    subtitle: "Descubre nuestra selección de frutas y verduras",
    imagen: dxn1,
    cta: "Ver Productos",
    link: "/productos"
  },
  {
    id: 2,
    title: "Deportes y Nutrición",
    subtitle: "Complementa tu entrenamiento con los mejores productos",
    imagen: fig2,
    cta: "Explorar",
    link: "/nutricion"
  },
  {
    id: 3,
    title: "Nutrición Deportiva",
    subtitle: "Alcanza tus objetivos con nuestra línea deportiva",
    imagen: fig3,
    cta: "Conoce Más",
    link: "/deportes"
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '70vh',
    overflow: 'hidden',
    borderRadius: '0px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      height: '25vh',
      borderRadius: '0px',
      marginBottom: theme.spacing(2)
    }
  },
  slideContainer: {
    height: '100%',
    position: 'relative',
  },
  slide: {
    height: '100%',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
      zIndex: 1,
    }
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      objectFit: 'cover',
    }
  },
  slideContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(3),
    color: '#fff',
    zIndex: 2,
    textAlign: 'center',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
  },
  navigationButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none', // Ocultar botones de navegación en móviles
    }
  },
  prevButton: {
    left: theme.spacing(2),
  },
  nextButton: {
    right: theme.spacing(2),
  },
  indicators: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    display: 'flex',
    gap: theme.spacing(1),
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&.active': {
      backgroundColor: '#fff',
      transform: 'scale(1.2)',
    }
  }
}));

function Carousel1() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep - 1 + slides.length) % slides.length);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          handleNext();
          return 0;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [activeStep]);

  return (
    <div className={classes.root}>
      <Box className={classes.carouselContainer}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={5000}
          className={classes.slideContainer}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className={classes.slide}>
              {Math.abs(activeStep - index) <= 2 ? (
                <>
                  <img
                    className={classes.image}
                    src={slide.imagen}
                    alt={slide.title}
                  />
                 {/*  <Fade in={activeStep === index} timeout={1000}>
                    <Box className={classes.slideContent}>
                      <Typography 
                        variant="h1" 
                        sx={{ 
                          fontSize: '3.5rem',
                          fontWeight: 700,
                          marginBottom: theme.spacing(2),
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          [theme.breakpoints.down('md')]: {
                            fontSize: '2.5rem',
                          },
                          [theme.breakpoints.down('sm')]: {
                            fontSize: '2rem',
                          },
                        }}
                      >
                        {slide.title}
                      </Typography>
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          fontSize: '1.5rem',
                          marginBottom: theme.spacing(3),
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                          [theme.breakpoints.down('sm')]: {
                            fontSize: '1.2rem',
                          },
                        }}
                      >
                        {slide.subtitle}
                      </Typography>
                    </Box>
                  </Fade> */}
                </>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

        {!isMobile && (
          <>
            <IconButton
              className={`${classes.navigationButton} ${classes.prevButton}`}
              onClick={handleBack}
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            <IconButton
              className={`${classes.navigationButton} ${classes.nextButton}`}
              onClick={handleNext}
            >
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </>
        )}

        <Box className={classes.indicators}>
          {slides.map((_, index) => (
            <FiberManualRecordIcon
              key={index}
              className={`${classes.indicator} ${index === activeStep ? 'active' : ''}`}
              onClick={() => handleStepChange(index)}
              fontSize="small"
            />
          ))}
        </Box>

        <Box className={classes.progressBar}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            classes={{ bar: classes.progress }}
          />
        </Box>
      </Box>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Carousel1 />
     {/*  <Box sx={{ my: 4 }} /> */}
      <Home />
    </>
  );
}

export default HomePage;
