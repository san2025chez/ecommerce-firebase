import { React } from 'react';
import { NavLink } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useMediaQuery from '@mui/material/useMediaQuery';
import "./Footer.scss";

export default function Footer1() {
  const isMobile = useMediaQuery('(max-width:768px)');

  const whatssaplink = "https://wa.me/5493883295503";
  const ubicacion = "https://goo.gl/maps/gQMUqC6ugjxxWSd79";

  const pages = [
    { id: 1, name: 'Cajas' },
    { id: 2, name: 'Botellines' },
    { id: 3, name: 'Cosmeticos' },
    { id: 4, name: 'DXN' },
  ];

  return (
    <footer className="footer">
      <div className={`footer__link ${isMobile ? 'footer__link--mobile' : ''}`}>
        {isMobile ? (
          <MobileFooterContent pages={pages} whatssaplink={whatssaplink} ubicacion={ubicacion} />
        ) : (
          <DesktopFooterContent pages={pages} whatssaplink={whatssaplink} ubicacion={ubicacion} />
        )}
      </div>
      <div className="footer__bottom">
        <div className="footer__copyrights">
          <p>Tienda LEO &copy; 2023</p>
          <p>Creado por <NavLink to="https://adasoft.com.ar"><u>ADASOFT</u></NavLink></p>
        </div>
      </div>
    </footer>
  );
}

const MobileFooterContent = ({ pages, whatssaplink, ubicacion }) => (
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
);

const DesktopFooterContent = ({ pages, whatssaplink, ubicacion }) => (
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
);
