import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, 
    Badge, 
    IconButton, 
    Toolbar, 
    Typography, 
    Button,
    Avatar,
    Divider,
    Select,
    MenuItem,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/login/userSlice';
import useReq from '../app/request';
import LANG from '../app/language';


function Header() {
    const userName = useSelector(selectUser).name;
    const [lang, setLang] = useState(localStorage.getItem("Flang"));
    const req = useReq();
    const nav = useNavigate();

    useEffect(()=> {
        localStorage.setItem("Flang", lang);
        nav(window.location.pathname); 
    },[lang]);

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography
                    component="h1"
                    variant="h6"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    BASE react
                </Typography>
                <Avatar alt={userName}/>
                <Typography
                    component="h5"
                    noWrap
                    sx={{marginLeft:'1%'}}
                >
                    {userName}
                </Typography>
                <Divider orientation="vertical" flexItem  sx={{marginLeft:'3%'}}/>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lang}
                    label="Language"
                    onChange={(e)=>{setLang(e.target.value)}}
                    sx={{margin:'0.2%'}}
                >
                    <MenuItem value={"ko"}>한글</MenuItem>
                    <MenuItem value={"en"}>English</MenuItem>
                </Select>
                <Divider orientation="vertical" flexItem  sx={{marginLeft:'1%'}}/>
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
                    >{LANG.get("l008")}</Typography>   
                    <Logout sx={{marginLeft:'3px'}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
