import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setName,
} from './userSlice';
import useReq from '../../app/request';
import { Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import LANG from '../../app/language'


export function Login() {
  const req = useReq();
  const idInput = useRef();
  const nav = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const dispatch = useDispatch();
  
  let TryLogin = () => {

    if(id === '' || pw === '') {
      alert(LANG.get("l005"));
      return;
    }

    req.post(
      {
        url: '/api/login/login',
        params: {'id' : id, 'pw' : pw},
        success: function(data) {
          req.setRToken(data.rtoken);
          req.setAToken(data.atoken);
          dispatch(setName(data.userName))

          let moveTo = sessionStorage.getItem('afterLogin');

          req.setSessionCheck();

          if(moveTo && moveTo !== "") {
            nav(moveTo);
          } else {
            nav("/");
          }
        },
        error: function(err) {
          if(err.httpStatus === 403) {
            alert(LANG.get("l006"));
            // focus id
            idInput.current.focus();
          } else {
            alert(JSON.stringify(err));
          }
        }
      }
    )
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        {LANG.get("l001")}
      </Typography>
      
        <Box sx={{ mt: 1 }}>
          <TextField
            inputRef={idInput}
            margin="normal"
            required
            fullWidth
            label={LANG.get("l002")}
            defaultValue={id}
            onChange={(e)=>{setId(e.target.value)}}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={LANG.get("l003")}
            type="password"
            defaultValue={pw}
            onChange={(e)=>{setPw(e.target.value)}}
          />
          <FormControlLabel
            control={<Checkbox 
              value="remember" 
              color="primary" 
              onChange={(e)=>{ if(e.target.checked) alert(LANG.get("l007"))}}
              />
            }
            label={LANG.get("l004")}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={TryLogin}
          >
            {LANG.get("l001")}
          </Button>
        </Box>
    </>
  );
}
