'use client';
import React from 'react';
import { useAuthRedirect } from '@/hooks';
import { useParams } from 'next/navigation';
import { Grid, Typography, Box } from '@mui/material';
import TabComponent from '@/components/UserSettings_Components/TabComponent';
import axios from '@/utility/axiosConfig';
import { useQuery } from 'react-query';

const page = () => {
    // useAuthRedirect('/signIn')
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
    } = useQuery(['profileData', id], () => fetchUserData(id));

    if (isUserLoading) {
        return <Box>Loading...</Box>;
    }

    if (isError) {
        return <Box>{error.message}</Box>;
    }

    return (
        <Grid container spacing={2} justifyContent={`center`}>
            <Grid item xs={12} md={9}>
                <Typography variant="h6" component="div" fontWeight={500}>
                    User Settings
                </Typography>
                <TabComponent user={userData} />
            </Grid>
        </Grid>
    );
};

export default page;
