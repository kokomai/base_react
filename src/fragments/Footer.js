import { Link, Typography } from '@mui/material';
import React from 'react';


function Copyright(props) {
    
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  

function Footer() {
    return (
        <Copyright sx={{ pt: 4 }} />
    );
}

export default Footer;
