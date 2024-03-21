import React from 'react';
import { AppBar, Toolbar, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Logo from '../shared/Navigation_Components/Logo';

const AuthTopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default AuthTopBar;
