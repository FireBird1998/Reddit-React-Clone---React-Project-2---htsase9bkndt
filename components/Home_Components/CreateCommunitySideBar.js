"use client";
import { Box, Button, Paper, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { useRouter } from 'next/navigation';
import { useTheme } from '@emotion/react';


const CreateCommunitySideBar = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Paper
            sx={{
                padding: '10px',
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '10px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: {
                    xs: 'none',
                    sm: 'none',
                    md: 'flex',
                    lg: 'flex',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}
            >
                <Box>
                    <SecurityOutlinedIcon sx={{ fontSize: '2rem' }} />
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Reddit Premium
                    </Typography>
                    <Typography>
                        The best Reddit experience, with monthly Coins
                    </Typography>
                </Box>
            </Box>
            <Button
                variant="contained"
                onClick={() => router.push('/get-premium')}
                sx={{
                    backgroundColor: 'darkorange',
                    color: 'white',
                    marginTop: '10px',
                    borderRadius: '50px',
                    width: '100%',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: 'darkorange',
                    },
                }}
            >
                Try Now
            </Button>
        </Paper>
    );
};

export default CreateCommunitySideBar;
