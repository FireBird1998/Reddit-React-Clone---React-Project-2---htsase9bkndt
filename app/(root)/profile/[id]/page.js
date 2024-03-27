'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Box, Grid } from '@mui/material';
import ProfileHero from '@/components/Profile_components/ProfileHero';
import ProfileSideBar from '@/components/Profile_components/ProfileSideBar';
import ProfileBody from '@/components/Profile_components/ProfileBody';
import { useAuthRedirect } from '@/hooks';
import { useQuery } from 'react-query';
import axios from '@/utility/axiosConfig';

const page = () => {
    // useAuthRedirect('/signIn');
    const { id } = useParams();
    const fetchUserData = async (id) => {
        try {
            const res = await axios.get(`reddit/user/${id}`);
            return res.data;
        } catch (err) {
            throw new Error('Failed to fetch user data');
        }
    };

    
    const {
        data: userData,
        isLoading: isUserLoading,
        isError,
        error,
    } = useQuery(['userData', id], () => fetchUserData(id));

    

    if (isUserLoading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
                <ProfileHero user={userData} />
                <ProfileBody user={userData} />
            </Grid>
            <Grid item xs={0} md={3} >
                <ProfileSideBar user={userData} />
            </Grid>
        </Grid>
    );
};

export default page;
