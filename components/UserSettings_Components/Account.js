import React, { useState } from 'react';
import { Box, Button, Divider, Typography, Modal, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const Account = ({ user }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                mt: 2,
            }}
        >
            <Typography
                variant="h6"
                component="div"
                fontWeight={600}
                sx={{ my: 5 }}
            >
                Account settings
            </Typography>
            <Typography
                variant="body1"
                component="div"
                fontWeight={400}
                sx={{
                    mt: 1,
                    color: theme.palette.text.secondary,
                }}
            >
                Account Preferences
            </Typography>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    mt: 2,
                }}
            >
                <Box>
                    <Typography variant="h6" component="div" fontWeight={500}>
                        Email Address
                    </Typography>
                    <Typography
                        variant="body1"
                        component="div"
                        fontWeight={300}
                        sx={{
                            color: theme.palette.text.secondary,
                        }}
                    >
                        {user.data.email}
                    </Typography>
                </Box>
                <ChangeEmailButton user={user} />
            </Box>
        </Box>
    );
};

const ChangeEmailButton = ({user}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Button
                sx={{
                    ml: 'auto',
                    borderRadius: '25px',
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.typography.color,
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.light,
                    },
                }}
                onClick={handleOpen}
            >
                Change Email
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Change-Email-Modal"
                aria-describedby="Modal-for-changing-email-address"
            >
                <Box sx={style}>
                    <Typography
                        id="Change-Email-Modal"
                        variant="h6"
                        component="h2"
                        sx={{
                        }}
                    >
                        Chnage Email 
                    </Typography>
                    <Typography
                        id="Modal-for-changing-email-address"
                        variant="body1"
                        component="div"
                        sx={{
                            mt: 2,
                        }}
                    >
                        Your current email address is: {user.data.email}
                    </Typography>
                    
                </Box>
            </Modal>
        </>
    );
};

export default Account;
