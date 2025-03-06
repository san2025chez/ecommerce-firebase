import { React, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from "@material-ui/icons/GitHub";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Container, Grid, Typography, IconButton, Divider, useTheme } from '@mui/material';
import "./Footer.scss";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatssaplink = "https://wa.me/5493883295503";
  const ubicacion = "https://goo.gl/maps/gQMUqC6ugjxxWSd79";

  const pages = [
    { id: 1, name: 'Regaleria' },
    { id: 2, name: 'Productos' },
    { id: 3, name: 'Frutas' },
    { id: 4, name: 'Verduras' },
  ];

  const socialLinks = [
    { icon: <InstagramIcon />, url: "https://instagram.com", label: "Instagram", color: "#E1306C" },
    { icon: <FacebookRoundedIcon />, url: "https://facebook.com", label: "Facebook", color: "#4267B2" },
    { icon: <WhatsAppIcon />, url: whatssaplink, label: "WhatsApp", color: "#25D366" },
  ];

  const titleStyles = {
    mb: isMobile ? 2 : 3,
    fontWeight: 'bold',
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -4,
      left: 0,
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, #1976d2, transparent)',
      transform: `translateX(${scrollPosition > 0 ? '0' : '-100%'})`,
      transition: 'transform 0.6s ease-out',
    }
  };

  const contentBoxStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? 1.5 : 2,
    mt: isMobile ? 2 : 3,
    transform: `translateY(${scrollPosition > 0 ? '0' : '20px'})`,
    opacity: scrollPosition > 0 ? 1 : 0.7,
    transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
  };

  return (
    <Box 
      component="footer" 
      sx={{
        backgroundColor: 'black',
        color: 'white',
        py: isMobile ? 4 : 6,
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #1976d2, transparent)',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 3 : 4}>
          {/* Columna de Información de Contacto */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={titleStyles}>
              Contacto
            </Typography>
            <Box sx={contentBoxStyles}>
              <NavLink to={ubicacion} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', textDecoration: 'none' }}>
                <LocationOnIcon fontSize="small" />
                <Typography>Perico, Jujuy</Typography>
              </NavLink>
              <NavLink to="mailto:contacto@ejemplo.com" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', textDecoration: 'none' }}>
                <MailIcon fontSize="small" />
                <Typography>contacto@ejemplo.com</Typography>
              </NavLink>
              <NavLink to={whatssaplink} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', textDecoration: 'none' }}>
                <WhatsAppIcon fontSize="small" />
                <Typography>WhatsApp</Typography>
              </NavLink>
            </Box>
          </Grid>

          {/* Columna de Navegación */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={titleStyles}>
              Navegación
            </Typography>
            <Box sx={contentBoxStyles}>
              {pages.map((page) => (
                <NavLink 
                  key={page.id} 
                  to={`/categoria/${page.name}`} 
                  className="footer-link"
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {page.name}
                </NavLink>
              ))}
            </Box>
          </Grid>

          {/* Columna de Redes Sociales */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={titleStyles}>
              Síguenos
            </Typography>
            <Box sx={{
              ...contentBoxStyles,
              flexDirection: 'row',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    '&:hover': {
                      color: social.color,
                      transform: 'scale(1.1) rotate(8deg)',
                      boxShadow: `0 0 15px ${social.color}40`
                    },
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ 
          my: isMobile ? 3 : 4, 
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)' 
        }} />
        
        <Typography 
          variant="body2" 
          align="center"
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem'
          }}
        >
          Creado por
          &nbsp;
          <NavLink to="https://adasoft.com.ar" className="nav-link blink-link" style={{ color: '#1976d2' }}><u>ADASOFT</u></NavLink>
          &nbsp;
          {currentYear} 
        </Typography>
      </Container>
    </Box>
  );
}