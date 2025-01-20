import { React } from 'react';
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Footer.scss";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Poppins, sans-serif', // Cambiado el tipo de fuente a Poppins sans-serif
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  footerLink: {
    margin: '10px 0 25px 0',
    padding: '10px 0', // Añadido para dar más espacio arriba y abajo
  },
}));

export default function Footer(props) {
  const isMobile = useMediaQuery('(max-width:768px)');

  const whatssaplink = "https://wa.me/5493883295503"
  const ubicacion = "https://goo.gl/maps/gQMUqC6ugjxxWSd79"

  const pages = [
    {
      id: 1,
      name: 'Regaleria'
    },
    {
      id: 2,
      name: 'Productos'
    },
    {
      id: 3,
      name: 'Frutas'
    },
    {
      id: 4,
      name: 'Verduras'
    },
  ];

  return (
    <div className="footer" style={{ backgroundColor: 'black',display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className={`footer__link ${isMobile ? 'footer__link--mobile' : ''}`} style={{ margin: '0 0 15px 0', flex: '0 1 auto'}}>
        {isMobile ? (
          <>
            <div className="footer__link__row">
              <div className="footer__link__wrapper">
                <div className="footer__link__items">
                  <h4 className="footer__link__titulo">Contactos</h4>
                  <div className="footer__link__links">
                    <NavLink to="/" className="footer__link__links">
                      <MailIcon fontSize="small" style={{ marginRight: "2px" }} />
                      Email
                    </NavLink>
                  </div>
                  <div className="footer__link__links">
                    <NavLink to={ubicacion} className="footer__link__links">
                      <LocationOnIcon fontSize="small" />
                      Perico,Jujuy
                    </NavLink>
                  </div>
                  <div className="footer__link__links">
                    <NavLink to={whatssaplink} className="footer__link__links">
                      <WhatsAppIcon fontSize="small" style={{ marginRight: "2px" }} />
                      Whatsapp
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="footer__link__wrapper">
                <div className="footer__link__items">
                  <h4 className="footer__link__titulo">Navegación</h4>
                  {pages.map((page) => (
                    <div key={page.id} className="footer__link__links">
                      <NavLink to={`/categoria/${page.name}`} className="footer__link__links">
                        {page.name}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer__link__row">
              <div className="footer__link__wrapper">
                <div className="footer__link__items">
                  <h4 className="footer__link__titulo">Redes Sociales</h4>
                  <a
                    href="https://www.instagram.com"
                    target="blank"
                    className="footer__link__icons">
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100094323146666"
                    target="blank"
                    className="footer__link__icons">
                    <FacebookRoundedIcon />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="footer__link__row" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="footer__link__column" style={{ flex: 1 }}>
              <div className="footer__link__wrapper">
                <div className="footer__link__items">
                  <h4 className="footer__link__titulo">Contactos</h4>
                  <div className="footer__link__links">
                    <NavLink to="/" className="footer__link__links">
                      <MailIcon fontSize="small" style={{ marginRight: "2px" }} />
                      Email
                    </NavLink>
                  </div>
                  <div className="footer__link__links">
                    <NavLink to={ubicacion} className="footer__link__links">
                      <LocationOnIcon fontSize="small" />
                      Perico,Jujuy
                    </NavLink>
                  </div>
                  <div className="footer__link__links">
                    <NavLink to={whatssaplink} className="footer__link__links">
                      <WhatsAppIcon fontSize="small" style={{ marginRight: "2px" }} />
                      Whatsapp
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer__link__column" style={{ flex: 1 }}>
              <div className="footer__link__wrapper">
                <div className="footer__link__items">
                  <h4 className="footer__link__titulo">Navegación</h4>
                  {pages.map((page) => (
                    <div key={page.id} className="footer__link__links">
                      <NavLink to={`/categoria/${page.name}`} className="footer__link__links">
                        {page.name}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer__link__column" style={{ flex: 1 }}>
              <div className="footer__link__wrapper">
                <div className="footer__link__items">
                  <h4 className="footer__link__titulo">Redes Sociales</h4>
                  <a
                    href="https://www.instagram.com"
                    target="blank"
                    className="footer__link__icons">
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100094323146666"
                    target="blank"
                    className="footer__link__icons">
                    <FacebookRoundedIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="footer__bottom" style={{ color: "black", flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
{/*         <div className="footer__copyrights" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <p className="footer__copyrights__text">Tienda LEO</p>
          <i className="far fa-copyright footer__copyrights__icon" style={{ margin: '0 5px' }}></i>
          <p className="footer__copyrights__text">2023</p>
        </div> */}
        <div className="footer__copyrights" style={{ display: 'flex', alignItems: 'center' , color:'white'}}>
          Creado por
          &nbsp;
          <NavLink to="https://adasoft.com.ar" className="nav-link blink-link"><u>ADASOFT</u> </NavLink>
        </div>
      </div>
    </div>
  );
}