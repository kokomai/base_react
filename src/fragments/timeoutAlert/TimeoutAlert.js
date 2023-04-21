import { Backdrop, Button, Card, CardActions, CardContent, Typography, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReq from '../../app/request';
import { hideTimeoutAlert, selectTimeoutAlert } from './timeoutSlice';


function TimeoutAlert() {
    const timeoutAlert = useSelector(selectTimeoutAlert);
    const dispatch = useDispatch();
    const req = useReq();
    const [count, setCount] = useState(req.getSessionTime());
    
    useEffect(()=> {
        setCount(req.getSessionTime());
        if(timeoutAlert) {
            if(count > 0) {
                setTimeout(()=> {
                    setCount(count - 1000);
                }, 1000)
            } else {
                setCount(req.getSessionTime());
            }
        }
    },[timeoutAlert, count])

    const extention = () => {
        dispatch(hideTimeoutAlert());
        req.setSessionTime();
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={timeoutAlert}
        >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 15, mx: 'auto' }} color="text.secondary">
                        안내
                    </Typography>
                    <hr></hr>
                    <Typography variant="h6" component="div">
                        세션이 만료될 예정입니다.
                    </Typography>
                    <hr></hr>
                    <br></br>
                    <Typography sx={{ mb: 1.5 }} color="text.primary">
                        만료 까지 남은 시간 : { 
                            (count / 6000) >= 1
                            ? parseInt(count / 60000) + '분' + (count % 60000) / 1000 +'초' 
                            : (count % 6000) / 1000 +'초' 
                        }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack direction="row" spacing={1} sx={{marginLeft: 'auto'}}>
                        <Button variant="outlined" color="error" onClick={()=>{req.logout()}}>로그아웃</Button>
                        <Button variant="contained" color="primary" onClick={()=>{extention();}}>연장</Button>
                    </Stack>
                </CardActions>
            </Card>
        </Backdrop>
    );
}

export default TimeoutAlert;
