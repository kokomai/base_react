import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useOutlet } from 'react-router';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

const theme = createTheme();

function LoginLayout() {
    const outlet = useOutlet();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
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
