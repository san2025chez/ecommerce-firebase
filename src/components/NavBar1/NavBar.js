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
    id: 2,
    name: 'Regaleria'
  },

  {
    id: 3,
    name: 'Productos'
  },
  {
    id: 4,
    name: 'Frutas'
  },
  {
    id: 5,
    name: 'Verduras'
  },
  {
    id: 6,
    name: 'Novedades'
  },
  {
    id: 7,
    name: 'Utiles'
  },
  
 
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

    <AppBar
      position="static"
      className="navbar"
      style={{
        background: 'linear-gradient(180deg, #fdfbf7 0%, #f7f2ea 100%)',
        color: '#1f2937',
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
        borderBottom: '1px solid rgba(31, 41, 55, 0.08)',
        left: isMobile ? '0px' : '',
        paddingLeft: isMobile ? '0px' : ''
      }}
    >
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
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      borderRadius: '999px',
                      minWidth: '150px',
                      maxWidth: '250px',
                      padding: '6px 12px 6px 36px',
                      color: '#1f2937',
                      border: '1px solid rgba(31, 41, 55, 0.10)',
                      boxShadow: '0 8px 18px rgba(31, 41, 55, 0.08)',
                    }}
                  />
                  <SearchIcon
                    style={{
                      color: '#6b7280',
                      position: 'absolute',
                      left: '12px',
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
                    sx={{
                      color: '#1f2937',
                      '&.MuiIconButton-sizeSmall': {
                        fontSize: '0.7em',
                      },
                    }}
                  >
                    <MenuIcon style={{color:'#1f2937', fontSize: '1.2em'}}/>

                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    style={{
                      position: 'fixed',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                      right: 0,
                    }}
                    PaperProps={{
                      style: {
                        backgroundColor: '#fdfbf7',
                        padding: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 0,
                      },
                    }}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <Box sx={{ 
                      padding: '16px', 
                      borderBottom: '1px solid rgba(31, 41, 55, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', fontSize: '1.2em' }}>
                        Categorías
                      </Typography>
                      <IconButton 
                        size="medium" 
                        onClick={handleCloseNavMenu}
                        sx={{ color: '#1f2937', fontSize: '1.2em' }}
                      >
                        <MenuIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      flex: 1,
                      overflowY: 'auto'
                    }}>
                      {pages.map((item) => (
                        <Link 
                          to={`/categoria/${item.name}`} 
                          key={item.id} 
                          style={{ textDecoration: 'none' }}
                        >
                          <MenuItem 
                            onClick={handleCloseNavMenu}
                            sx={{
                              padding: '16px',
                              borderBottom: '1px solid rgba(31, 41, 55, 0.08)',
                              '&:hover': {
                                backgroundColor: 'rgba(37, 99, 235, 0.08)'
                              }
                            }}
                          >
                            <Typography sx={{ 
                              color: '#1f2937', 
                              fontSize: '1.2em', 
                              width: '100%',
                              textAlign: 'center',
                              fontWeight: 600
                            }}>
                              {item.name}
                            </Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </Box>
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
                  sx={{ 
                    my: 1.5,
                    color: '#1f2937',
                    display: 'block',
                    fontSize: '0.85em',
                    fontWeight: 600,
                    '&:hover': {
                      color: '#2563eb',
                      backgroundColor: 'rgba(37, 99, 235, 0.08)'
                    }
                  }}
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
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: '999px',
                  padding: '6px 12px 6px 36px',
                  color: '#1f2937',
                  border: '1px solid rgba(31, 41, 55, 0.10)',
                  boxShadow: '0 8px 18px rgba(31, 41, 55, 0.08)',
                }}
              />
              <SearchIcon
                style={{
                  color: '#6b7280',
                  position: 'absolute',
                  left: '12px',
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
