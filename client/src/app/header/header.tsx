'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { alpha, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation'

const pages = [
    {navTitle: 'Scanner', url: 'scanner'}, 
    {navTitle: 'Watchlist', url: 'watchlist'}, 
    {navTitle: 'Market Trends', url: 'trends'},
    {navTitle: 'paper Trading', url: 'paper-trading'},
    {navTitle: 'support', url: 'support'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    border: `1px solid ${alpha(theme.palette.primary.dark, 0.5)}`,
    color: theme.palette.primary.dark,
    '&:hover': {
        backgroundColor: '#fff',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const focused = (ev: React.FormEvent) => {
    console.log(ev.target)
}

function changed(ev: React.FormEvent) {
    console.log((ev.target as any).value)
}

function ButtonAppBar() {
    const router = useRouter()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (url: string) => {
        setAnchorElNav(null);
        router.push(url)
    };

    const handleLogin = () => {
        window.location.href = '/api/auth/custom-login';
      };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: "#fff", height: '100px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    {/* <a href="/">
                        <Image src={bullxLogo} className="logo react" width={100}
                            height={50} alt="React logo" />
                    </a> */}
                    <Typography
                        variant="h6"
                        color='black'
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 0,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontSize: '34px',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            textDecoration: 'none',
                        }}
                    >
                        BULL
                    </Typography>
                    <Typography
                        variant="h6"
                        color='#4B0082'
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 'bolder',
                            fontSize: '34px',
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        X
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="primary"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.navTitle} onClick={() => handleCloseNavMenu(page.url)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.navTitle}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none', color: 'primary' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        color='primary'
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        Bullx
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                        {pages.map((page) => (
                            <Button

                                key={page.navTitle}
                                onClick={() => handleCloseNavMenu(page.url)}
                                sx={{ my: 2, display: 'block', }}
                            >
                                <Typography sx={{ fontSize: '1rem', fontWeight: '600', textAlign: 'center', color: 'black'  }}>{page.navTitle}</Typography>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end', marginRight: '1rem' } }}>
                        <Search >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Pick a stock"
                                inputProps={{ 'aria-label': 'search' }}
                                onInput={(ev) => changed(ev)}
                                onFocus={focused}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button variant='contained' sx={{ bgcolor: '#4B0082', color: '#fff' }} onClick={handleLogin}>Login</Button>
                    </Box>
                    {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ButtonAppBar;
