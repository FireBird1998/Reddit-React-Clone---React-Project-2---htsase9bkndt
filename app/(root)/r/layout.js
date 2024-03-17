"use client";
import { Grid } from '@mui/material';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <Grid container component="main" spacing={1}>
      {children}
    </Grid>
  );
};

export default Layout;
