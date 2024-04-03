'use client';
import SwiperComponent from '@/components/Popular_Components/SwiperComponet';
import { Box, Grid, useMediaQuery } from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useTheme } from '@emotion/react';
import FilterBar from '@/components/Home_Components/FilterBar';
import LoadMore from '@/components/Home_Components/LoadMore';
import SideBarPopularCommunity from '@/components/Home_Components/SideBarPopularCommunity';

const PopularPage = () => {
    const { isUserAuthenticated } = useContext(AuthContext);
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Grid container justifyContent={'center'} spacing={3} >
            <Grid item xs={isUserAuthenticated() ? isMd ? 9 : 12 : 12}>
                <Box
                    p={2}
                    textAlign="center"
                    sx={{
                        minHeight: '20vh',
                    }}
                >
                    <SwiperComponent />
                </Box>
            </Grid>
            <Grid item xs={12} md={9} lg={6}>
              <FilterBar />
              <LoadMore />
            </Grid>
            <Grid item xs={0} lg={3}>
              <SideBarPopularCommunity />
              </Grid>
        </Grid>
    );
};

export default PopularPage;
