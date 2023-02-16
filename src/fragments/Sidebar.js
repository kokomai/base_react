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
import { Assignment, AssignmentInd, ChevronRight as ChevronRightIcon,
    Home,
    Logout
 } from '@mui/icons-material';

function Sidebar({open, toggleDrawer}) {
        const linkList = [
            {link: '/', text : '홈', icon: <Home></Home>},
            {link: '/about', text : 'about', icon: <Assignment></Assignment> },
            {link: '/mypage', text : '마이페이지', icon: <AssignmentInd></AssignmentInd>},
        ]
        
        const nav = useNavigate();

        const onMenuClick = (link) => {
            nav(link);
            toggleDrawer();
        }

        return (
        <Drawer 
            anchor={'right'}
            open={open}>
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronRightIcon />
                </IconButton>
                
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
            <Box sx={{position: 'absolute', bottom:"0px"}}>
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
            </Box>
        </Drawer>
    );
}

export default Sidebar;
