import { Backdrop, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert, hideConfirm, selectPopup, setAlertBtnText, setOnCancel, setOnConfirm, setText, setTitle } from './popupSlice';


export default  function Popup() {
    const popup = useSelector(selectPopup);
    const dispatch = useDispatch();
    const timeOut = 200;

    const alertHide = () => {
        dispatch(hideAlert());
        setTimeout(()=> {
            popup.onConfirm();
        }, timeOut);
        
    }

    const confirmCancel = () => {
        dispatch(hideConfirm());
        setTimeout(()=> {
            popup.onCancel();
        }, timeOut);
    }

    const confirmAgree = () => {
        dispatch(hideConfirm());
        setTimeout(()=> {
            popup.onConfirm();
        }, timeOut);
    }

    return (
        <>
        {/* popup */}
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={popup.alert}
        >
            <Card sx={{ minWidth: "30%", minHeight: "10%"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {popup.title}
                    </Typography>
                    <Typography variant="body2">
                        {popup.text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack direction="row" spacing={1} sx={{marginLeft: 'auto'}}>
                        <Button variant="contained" color="primary" onClick={()=>{alertHide()}}>{popup.alertBtnText}</Button>
                    </Stack>
                </CardActions>
            </Card>
        </Backdrop>

        {/* confirm */}
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={popup.confirm}
        >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {popup.title}
                    </Typography>
                    <Typography variant="body2">
                        {popup.text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack direction="row" spacing={1} sx={{marginLeft: 'auto'}}>
                        <Button variant="contained" color="error" onClick={()=>{confirmCancel()}}>{popup.cancelBtnText}</Button>
                        <Button variant="contained" color="primary" onClick={()=>{confirmAgree()}}>{popup.confirmBtnText}</Button>
                    </Stack>
                </CardActions>
            </Card>
        </Backdrop>
        </>
    )
}