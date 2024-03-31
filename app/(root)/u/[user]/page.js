'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useAuthRedirect } from '@/hooks';
import { useQuery } from 'react-query';
import axios from '@/utility/axiosConfig';
import { Box, Grid } from '@mui/material';
import UserHero from '@/components/User_Components/UserHero';
import UserBody from '@/components/User_Components/UserBody';
import { UserProvider, useUser } from '@/components/User_Components/UserSuperContext';
const page = () => {
    // useAuthRedirect('/signIn');
    const { user } = useParams();
    const fetchUserData = async (user) => {
        try {
            const res = await axios.get(`reddit/user/${user}`);
            return res.data;
        } catch (err) {
            throw new Error('Failed to fetch user data');
        }
    };

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery(['userData', user], () => fetchUserData(user));

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12} md={6}>
                <UserHero user={data} />
                <UserBody user={data} />
            </Grid>
            <Grid item xs={0} md={3}></Grid>
        </Grid>
    );
};

export default page;
