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
import { selectTabs, add, setIndex } from './tabs/tabsSlice';
import { useDispatch, useSelector } from 'react-redux';

function TableSidebar({open, toggleDrawer, drawerWidth}) {
        const linkList = [
            {link: '/tabSample', text : LANG.get("m004"), icon: <Home></Home>},
            {link: '/tabTableSample', text : "탭 테이블 샘플", icon: <Assignment></Assignment> },
            {link: '/tabPopupSample', text : "탭 팝업 샘플", icon: <AssignmentInd></AssignmentInd>},
            {link: '/tabFileSample', text : "탭 파일 샘플", icon: <QuizIcon></QuizIcon>},
        ]

        const dispatch = useDispatch();

        const tabs = useSelector(selectTabs);
        const nav = useNavigate();

        const onMenuClick = (link, text) => {
            dispatch(add({url: link, title: text, value: {"test123": "test1234"}}));
            dispatch(setIndex(tabs.tabs.length));
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
                    <ListItem key="defaultHome" disablePadding onClick={()=>{nav("/")}}>
                        <ListItemButton>
                        <ListItemIcon>
                        <Home></Home>
                        </ListItemIcon>
                        <ListItemText primary={"일반 홈으로"} />
                        </ListItemButton>
                    </ListItem>
                    {linkList.map((obj, index) => (
                    <ListItem key={obj.link} disablePadding onClick={()=>{onMenuClick(obj.link, obj.text);}}>
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

export default TableSidebar;
