'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useQuery } from 'react-query';
import { useTheme } from '@emotion/react';
import {
    useMediaQuery,
    Box,
    Card,
    CardMedia,
    Paper,
    Avatar,
    CardContent,
    Typography,
} from '@mui/material';
import SnackbarEL from '../shared/Notification_Components/SnachBarEL';
import TabsMain from './TabsMain';

const ProfileHero = ({ user }) => {
    return (
        <Box>
            <TopBanner user={user} />
            <TabsMain />
        </Box>
    );
};

const TopBanner = ({ user }) => {
    return (
        <Paper
            sx={{
                backgroundColor: 'primary.main',
                padding: 2,
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
            
            }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={user.data.profileImage}
                    alt="green iguana"
                    sx={{
                        width: 200,
                        objectFit: 'cover',
                        borderRadius: '25px',
                    }}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {user.data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.data.email}
                    </Typography>
                </CardContent>
                
            </Box>
        </Paper>
    );
};

export default ProfileHero;
