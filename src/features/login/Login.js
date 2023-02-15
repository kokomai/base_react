import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setName,
} from './userSlice';
import useReq from '../../app/request';
import { Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';


export function Login() {
  const req = useReq();
  const idInput = useRef();
  const nav = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const dispatch = useDispatch();

  let TryLogin = () => {

    if(id === '' || pw === '') {
      alert("필수값을 채워주세요");
      return;
    }

    req.post(
      {
        url: '/api/login/login',
        params: {'id' : id, 'pw' : pw},
        success: function(data) {
          req.setRToken(data.rtoken);
          req.setAToken(data.atoken);
          dispatch(setName(data.username))
          nav("/");
        },
        error: function(err) {
          if(err.httpStatus === 403) {
            alert("아이디 혹은 비밀번호를 확인해 주세요!");
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
          로그인
      </Typography>
      
        <Box sx={{ mt: 1 }}>
          <TextField
            inputRef={idInput}
            margin="normal"
            required
            fullWidth
            label="아이디"
            defaultValue={id}
            onChange={(e)=>{setId(e.target.value)}}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="비밀번호"
            type="password"
            defaultValue={pw}
            onChange={(e)=>{setPw(e.target.value)}}
          />
          <FormControlLabel
            control={<Checkbox 
              value="remember" 
              color="primary" 
              onChange={(e)=>{ if(e.target.checked) alert('개인 PC에서만 체크해주세요.'); }}
              />
            }
            label="자동로그인"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={TryLogin}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                비밀번호를 잊으셨습니까?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                회원가입하기
              </Link>
            </Grid>
          </Grid>
        </Box>
    </>
  );
}
