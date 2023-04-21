import React from 'react';
import { 
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Assignment, 
    AssignmentInd, 
    ChevronRight as ChevronRightIcon,
    Quiz as QuizIcon,
    Home,
    Logout
 } from '@mui/icons-material';
 import LANG from '../app/language';

function Sidebar({open, toggleDrawer, drawerWidth}) {
        const linkList = [
            {link: '/', text : LANG.get("m001"), icon: <Home></Home>},
            {link: '/about', text : LANG.get("m002"), icon: <Assignment></Assignment> },
            {link: '/mypage', text : LANG.get("m003"), icon: <AssignmentInd></AssignmentInd>},
            {link: '/sample', text : LANG.get("m004"), icon: <QuizIcon></QuizIcon>},
            {link: '/tabSample', text : "탭 구조 샘플", icon: <QuizIcon></QuizIcon>},
        ]
        
        const nav = useNavigate();

        const onMenuClick = (link) => {
            nav(link);
            toggleDrawer();
        }

        return (
        <Drawer 
            // open={open}
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            >
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
                
                
            >
                {/* <IconButton onClick={toggleDrawer}>
                    <ChevronRightIcon />
                </IconButton> */}
                
            </Toolbar>
            <Divider />
            <Box
                role="presentation"
                >
                <List>
                    {linkList.map((obj, index) => (
                    <ListItem key={obj.link} disablePadding onClick={()=>{onMenuClick(obj.link);}}>
                        <ListItemButton>
                        <ListItemIcon>
                            {obj.icon}
                        </ListItemIcon>
                        <ListItemText primary={obj.text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                    
                </List>
                <Divider />
            </Box>
            {/* <Box sx={{position: 'absolute', bottom:"0px"}}>
                <List>
                    <ListItem key={'logout'} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                        <ListItemText primary={'로그아웃'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box> */}
        </Drawer>
    );
}

export default Sidebar;
