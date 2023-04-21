import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useNavigate, useOutlet } from 'react-router';
import { AppBar, Container, createTheme, CssBaseline, Divider, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

const theme = createTheme();

function LoginLayout() {
    const outlet = useOutlet();
    const [lang, setLang] = useState(localStorage.getItem("Flang"));
    const nav = useNavigate();

    
    useEffect(()=> {
        localStorage.setItem("Flang", lang);
        nav(window.location.pathname); 
    },[lang]);

    return (
        <ThemeProvider theme={theme}>
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
                    <Divider orientation="vertical" flexItem  sx={{marginLeft:'3%'}}/>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={lang}
                        label="Language"
                        onChange={(e)=>{setLang(e.target.value)}}
                        sx={{margin:'1%'}}
                    >
                        <MenuItem value={"ko"}>한글</MenuItem>
                        <MenuItem value={"en"}>English</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{mt:'30%'}}>
                <CssBaseline/>
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    {outlet}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginLayout;
