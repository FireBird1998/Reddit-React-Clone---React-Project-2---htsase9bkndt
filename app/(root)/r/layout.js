"use client";
import { Grid } from '@mui/material';
import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const Layout = ({ children }) => {
  const theme = useTheme();
  return (
    <Grid container component="main" spacing={1} sx={{
      backgroundColor: theme.palette.background.default,
    }}>
      {children}
    </Grid>
  );
};

export default Layout;
