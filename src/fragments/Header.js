import { styled } from '@mui/system';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, 
    Badge, 
    IconButton, 
    Toolbar, 
    Typography, 
    Button,
    Avatar,
    Divider,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/login/userSlice';
import useReq from '../app/request';


function Header() {
    const userName = useSelector(selectUser).name;
    const req = useReq();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography
                    component="h1"
                    variant="h6"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    BMW AAS
                </Typography>
                <Avatar alt={userName}/>
                <Typography
                    component="h5"
                    noWrap
                    sx={{marginLeft:'1%'}}
                >
                    {userName} 님
                </Typography>
                <Divider orientation="vertical" flexItem  sx={{marginLeft:'3%'}}/>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={()=>{ req.logout();}}
                    sx={{marginLeft:'1%'}}
                >
                    <Typography
                    component="h3"
                    noWrap
                    sx={{ flexGrow: 1 }}
                    >로그아웃</Typography>   
                    <Logout sx={{marginLeft:'3px'}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
