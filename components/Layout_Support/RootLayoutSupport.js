import React from 'react';
import { Box } from '@mui/material';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

const RootLayoutSupport = ({ children }) => {
    const { isUserAuthenticated } = useContext(AuthContext);
    return (
        <Box
            sx={{
                padding: '20px',
                position: 'absolute',
                width: {
                    xs: '100%', // take full width on xs screens
                    lg: isUserAuthenticated() ? '100%' : 'calc(100% - 250px)', // subtract width of drawer
                    xl: isUserAuthenticated() ? '100%' : 'calc(100% - 250px)', // subtract width of drawer
                },
                height: '100%',
                overflow: 'auto',
                bgcolor: 'background.default',
                right: 0,
                top: 0,
                bgcolor: 'background.default',
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '20px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                },
            }}
        >
            {children}
        </Box>
    );
};

export default RootLayoutSupport;
