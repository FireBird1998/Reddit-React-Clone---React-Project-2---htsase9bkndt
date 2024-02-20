import React from 'react';
import { AppBar, Toolbar, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const AuthTopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Reddit Clone
        </Typography>
        <MuiLink color="inherit" component={Link} href="/" underline="none">
          Home
        </MuiLink>
      </Toolbar>
    </AppBar>
  );
};

export default AuthTopBar;
