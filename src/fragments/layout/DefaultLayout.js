
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Header from '../Header';
import Footer from '../Footer';
import { useOutlet } from 'react-router';
import Sidebar from '../Sidebar';
import { useState } from 'react';


const mdTheme = createTheme();

function DefaultLayout() {
  const [open, setOpen] = useState(false);
  const outlet = useOutlet();
  
  const drawerWidth = 240;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header></Header>
        <Sidebar open={open} drawerWidth={drawerWidth} toggleDrawer={toggleDrawer}></Sidebar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container  sx={{ mt: 4, mb: 4 }}>
            {outlet}
            <Footer></Footer>
          </Container>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}

export default DefaultLayout;