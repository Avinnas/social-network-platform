import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutMenuButton from "./LogoutMenuButton";
import {Link} from "react-router-dom";
import LoginMenuButton from "./LoginMenuButton";
import "./SimpleAppbar.css"
import {Container} from "@mui/material";

export default function SimpleAppbar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx = {{display: "flex", justifyContent: "space-between", flexWrap: "nowrap"}}>
                <Toolbar>
                    <Container sx = {{display: "inline-block"}}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/"> <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginRight: 5 }}>
                            Home
                        </Typography></Link>
                        <Link to="/messenger"><Typography variant="h6" component="div" sx={{ flexGrow: 1, marginRight: 5 }}>
                            Messenger
                        </Typography></Link>

                    </Container>
                    <Container sx = {{display: "inline-block"}}>
                        <LoginMenuButton/>
                        <LogoutMenuButton/>
                    </Container>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
