import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.scss'
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { APIs } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const pages = [
  {
    id: 1,
    name: 'Productos'
  },
  {
    id: 2,
    name: 'Frutas'
  },
  {
    id: 3,
    name: 'Verduras'
  },
  {
    id: 4,
    name: 'Mercaderias'
  },
  {
    id: 5,
    name: 'Fiambres'
  },
  {
    id: 6,
    name: 'Ofertas'
  }
];
const settings = [
  {
    id: 1,
    name: 'Profile'
  },
  {
    id: 2,
    name: 'Account'
  },
  {
    id: 3,
    name: 'Dashboard',
  },
  {
    id: 4,
    name: 'Logout'
  }];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {

      navigate(`/search/${searchValue}`)
      setSearchValue('')
    }

  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (

    <AppBar position="static" style={{ backgroundColor: "#000000", left: isMobile ? '0px' : '', paddingLeft: isMobile ? '0px' : '' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!isMobile && (
            <Link to="/">
              <IconButton
                edge="start"
                size="large"
                color="inherit"
              >
                <img
                  src={process.env.PUBLIC_URL + '/producto-natural.png'}
                  alt="Logo"
                  style={{
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover'
                  }}
                />
              </IconButton>
            </Link>
          )}
          {isMobile ? (

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: '0px',
                paddingLeft: '0px',
                top: '0px',
                left:'0px'
              }}
            >
              <Tooltip title="Inicio">
                <Link to="/">
                  <IconButton
                    edge="start"
                    size="large"
                    color="inherit"
                  >
                    <img
                      src={process.env.PUBLIC_URL + '/producto-natural.png'}
                      alt="Imagen"
                      style={{
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                      }}
                    />
                  </IconButton>
                </Link>
              </Tooltip>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <InputBase
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      minWidth: '150px',
                      maxWidth: '250px',
                      padding: '4px 8px 4px 32px',
                      color: 'black',
                    }}
                  />
                  <SearchIcon
                    style={{
                      color: 'gray',
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      const enterKeyPressEvent = { key: 'Enter', keyCode: 13 };
                      handleKeyPress(enterKeyPressEvent);
                    }}
                  />
                </div>
                <Box sx={{ display: 'flex', alignItems: 'left', textAlign: 'left' }}>

                  <IconButton
                    edge="start"
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"


                  >
                    <MenuIcon />

                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    style={{
                      position: 'fixed',
                    maxWidth:'100%',
                    maxHeight:'100%',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}

                    PaperProps={{
                      style: {
                        backgroundColor: 'rgba(106, 27, 154, 0.8)',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        maxWidth:'100%',
                        maxHeight:'100%',
                      },
                    }}
                    sx={{
                      display: { xs: 'block', md: 'none' ,top:'0px'},
                    }}
                  >
                    {pages.map((item) => (
                      <Link to={`/categoria/${item.name}`}><MenuItem key={item.id} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center" className="mobile-menu-item" style={{ fontSize: '1.2em' }}>{item.name}</Typography>
                      </MenuItem></Link>
                    ))}
                  </Menu>
                  <Tooltip title="Open settings">
                    <CartWidget fontSize="small" />
                  </Tooltip>
                </Box>
              </Box>
            </Box>

          ) : (





            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((item, index) => (
                <Button
                  key={item.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'blue', display: 'block', fontSize: '0.8em' }} // Cambio para reducir el tamaño de la letra en dispositivos de escritorio
                >
                  <Link to={`/categoria/${item.name}`}>  {index !== 0 && <span style={{ marginRight: '10px' }} />} {item.name} </Link>
                </Button>
              ))}
            </Box>
          )}






          {!isMobile && (

            <>    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', position: 'relative' }}>
              <InputBase
                placeholder="Buscar..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  padding: '4px 8px 4px 32px',
                  color: 'black',
                }}
              />
              <SearchIcon
                style={{
                  color: 'gray',
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const enterKeyPressEvent = { key: 'Enter', keyCode: 13 };
                  handleKeyPress(enterKeyPressEvent);
                }}
              />
            </div>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <CartWidget />
                </Tooltip>
              </Box>
            </>

          )}


        </Toolbar>

      </Container>

    </AppBar>

  );
};
export default NavBar;

