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
import AdbIcon from '@mui/icons-material/Adb';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../services/AuthProvider";
import LoginMenuButton from "./LoginMenuButton";

const pages = new Map([['Messenger', '/messenger']])


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate()
    const {isLoggedIn, setIsLoggedIn} = useAuth()

    let logoutAndRedirect = () => {
        logout();
        navigate("/")
    }

    const settings = new Map([
        ['Profile', () => {
        }],
        ['Account', () => {
        }],
        ['Dashboard', () => {
        }],
        ['Logout', () => logoutAndRedirect()]]);

    const logout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false)
    }


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

    const renderUserMenu = () => {
        return (
            <Box sx={{flexGrow: 0}}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
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
                    {Array.from(settings).map(([setting, action]) => (
                        <MenuItem key={setting} onClick={() => {
                            handleCloseUserMenu();
                            console.log("logout click")
                            action();
                        }}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        )

    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        component={Link} to={'/'}
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
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
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {Array.from(pages).map(([page, link]) => (
                                    <MenuItem
                                        component={Link}
                                        to={link}
                                        key={page}
                                        onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>

                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to={"/"}
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {Array.from(pages).map(([page, link]) => (
                            <Button
                                component={Link}
                                to={link}
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {isLoggedIn ? renderUserMenu() : <><LoginMenuButton/><Link to="/register"> <Button color="inherit">Sign up</Button></Link></>}


                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
