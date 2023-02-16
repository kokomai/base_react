import { styled } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, 
    Badge, 
    IconButton, 
    Toolbar, 
    Typography, 
    Button,
} from '@mui/material';
import { Menu as MenuIcon} from '@mui/icons-material';


function Header({open, toggleDrawer}) {

    // const AppBar = styled(MuiAppBar, {
    //     shouldForwardProp: (prop) => prop !== 'open',
    //   })(({ theme, open }) => ({
    //     zIndex: theme.zIndex.drawer + 1,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //       easing: theme.transitions.easing.sharp,
    //       duration: theme.transitions.duration.leavingScreen,
    //     }),
    //     ...(open && {
    //       marginLeft: drawerWidth,
    //       width: `calc(100% - ${drawerWidth}px)`,
    //       transition: theme.transitions.create(['width', 'margin'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //       }),
    //     }),
    //   }));

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
            sx={{
                pr: '24px', // keep right padding when drawer closed
            }}
            >
            
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                대시보드
            </Typography>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
