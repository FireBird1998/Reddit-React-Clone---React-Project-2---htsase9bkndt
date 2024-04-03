import { Box, CardMedia, Typography } from '@mui/material';
import React from 'react';

const page = () => {
    return (
        <Box>
            <CardMedia
                component="img"
                alt="Comming Soon"
                height="90%"
                image="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                sx={{
                    objectFit: 'cover',
                    objectPosition: 'top',
                    borderRadius: '16px',
                }}
            />
        </Box>
    );
};

export default page;
