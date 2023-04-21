
import { Container, IconButton, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutlet } from 'react-router';
import LANG from '../../app/language';
import Main from '../../features/main/Main';
import { remove, selectTabs, setIndex } from '../tabs/tabsSlice';
import About from '../../features/about/About';
import { Sample } from '../../features/sample/Sample';
import PopupSample from '../../features/sample/PopupSample';
import TableSample from '../../features/sample/TableSample';
import { FileSample } from '../../features/sample/fileSample';
import Mypage from '../../features/mypage/Mypage';
import Header from '../Header';
import Sidebar from '../Sidebar';
import TableSidebar from '../TabSidebar';
import CloseIcon from '@mui/icons-material/Close';


const mdTheme = createTheme();

function TabLayout() {
  const [open, setOpen] = useState(false);
  const tabs = useSelector(selectTabs);
  const [localTabs, setLocalTabs] = useState(tabs.tabs);
  const [localIndex, setLocalIndex] = useState(tabs.index);

  const urlMapper = {
    "/" : <Main/>,
    "/about" : <About/>,
    "/mypage" : <Mypage/>,
    "/tabSample" : <Sample/>,
    "/tabPopupSample" : <PopupSample/>,
    "/tabTableSample" : <TableSample/>,
    "/tabFileSample" : <FileSample/>,
  }

  
  // const componentResorver = (url, params) => {
    //   return ;
    // }
    
    const outlet = useOutlet();
    
    const dispatch = useDispatch();
    
  useEffect(()=> {
    setLocalTabs(tabs.tabs);
    setLocalIndex(tabs.index);
  }, [tabs])

  const handleChange = (event, newValue) => {
    dispatch(setIndex(newValue));
  };

  const closeTab = (idx) => {
    dispatch(remove(idx));
  }

  const drawerWidth = 240;
  const drawerWidthPx = drawerWidth+"px";

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{width: '100%'}}>
        <CssBaseline />
        <Header></Header>
        <TableSidebar open={open} drawerWidth={drawerWidth} toggleDrawer={toggleDrawer}></TableSidebar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            marginTop:'4em',
            marginLeft: drawerWidthPx,
            height: '100vh',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={localIndex} onChange={handleChange} aria-label="basic tabs example">
              {
                localTabs.length > 0 
                ? localTabs.map((tab, idx) => (
                  <Tab key={tab.url + idx} label={
                    (
                      <span>
                        {tab.title}
                        {
                          <a
                            aria-label="close"
                            color="red"
                            size="small"
                            onClick={
                              (e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                closeTab(idx);
                              }
                            }
                            style={{marginLeft:"0.1em"}}
                          >
                            <CloseIcon fontSize="inherit" sx={{ color: 'black', '&:hover': {
       color: "#f00",
    } }} />
                          </a>
                        }
                      </span>
                      
                    )
                  }/>
                ))
                : <Tab label={"현재 TAB 없음"}/>
              }
            </Tabs>
          </Box>
          {
              localTabs.length > 0 
              ? localTabs.map((tab, idx) => (
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
                  key={tab.url + idx + "tabContents"}
                  hidden={localIndex !== idx}
                >
                  <Container  sx={{ mt: 4, mb: 4 }}>
                    {urlMapper[tab.url]}
                  </Container>
                </Box>
              ))
              : <>현재 tab 없음</>
          }
      </Box>
      </Box>
    </ThemeProvider>
  );
}

export default TabLayout;