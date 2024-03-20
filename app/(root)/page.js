'use client';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import SideBarPopularCommunity from '@/components/Home_Components/SideBarPopularCommunity';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import CreatePostHomeEl from '@/components/Home_Components/CreatePostHomeEl';
import FilterBar from '@/components/Home_Components/FilterBar';
import RPremiumSideBar from '@/components/Home_Components/RPremiumSideBar';
import PostContainer from '@/components/Home_Components/PostContainer';

export default function Home() {
    const theme = useTheme();
    const { isUserAuthenticated } = useContext(AuthContext);
    return (
        <Box
            sx={{
                display: 'flex',
                backgroundColor: theme.palette.background.default,
                position: 'relative',
                minHeight: '100%',
                width: '100%',
            }}
        >
            <Grid
                container
                spacing={3}
                justifyContent={isUserAuthenticated() ? `center` : ``}
                alignContent={`flex-start`}
            >
                {isUserAuthenticated() ? (
                    <Grid item xs={12} lg={6}>
                        <CreatePostHomeEl />
                        <FilterBar />
                        <PostContainer />
                    </Grid>
                ) : (
                    <Grid item xs={12} lg={8}>
                        {/* <CreatePostHomeEl /> */}
                        <FilterBar />
                        <PostContainer />
                    </Grid>
                )}
                {isUserAuthenticated() && (
                    <Grid item xs={false} lg={3}>
                        <RPremiumSideBar />
                        <SideBarPopularCommunity />
                    </Grid>
                )}
                {!isUserAuthenticated() && (
                    <Grid item xs={false} lg={3}>
                        <SideBarPopularCommunity />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
