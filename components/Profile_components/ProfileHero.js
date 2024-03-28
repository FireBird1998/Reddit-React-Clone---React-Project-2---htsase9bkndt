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

const ProfileHero = ({ user }) => {
    return (
        <Box>
            <TopBanner user={user} />
            
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
                    height="180"
                    image={user.data.profileImage ? user.data.profileImage : 'https://source.unsplash.com/2000x2000/?nature'}
                    alt="green iguana"
                    sx={{
                        width: 160,
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
