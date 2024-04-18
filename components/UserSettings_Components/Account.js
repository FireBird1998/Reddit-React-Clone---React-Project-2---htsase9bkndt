import React, { useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Typography,
    Modal,
    useMediaQuery,
    TextField,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '@/utility/axiosConfig';
import SnackbarEL from '../shared/Notification_Components/SnachBarEL';

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
            <Box
                sx={{
                    display: 'flex',
                    mt: 2,
                }}
            >
                <Box>
                    <Typography variant="h6" component="div" fontWeight={500}>
                        User Name
                    </Typography> 
                    <Typography
                        variant="body1"
                        component="div"
                        fontWeight={300}
                        sx={{
                            color: theme.palette.text.secondary,
                        }}
                    >
                        {user.data.name}
                    </Typography>  
                </Box>
                <ChangeNameButton user={user} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    mt: 2,
                }}
            >
                <Box>
                    <Typography variant="h6" component="div" fontWeight={500}>
                       Change Password
                    </Typography> 
                    <Typography
                        variant="body1"
                        component="div"
                        fontWeight={300}
                        sx={{
                            color: theme.palette.text.secondary,
                        }}
                    >
                        for {user.data.name}
                    </Typography>  
                </Box>
                <ChangePasswordButton user={user} />
            </Box>
        </Box>
    );
};

const ChangeEmailButton = ({ user }) => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const queryClient = useQueryClient();

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

    const emailMutation = useMutation((email) => {
        const formData = new FormData();
        formData.append('email', email);
        return axios.patch(`reddit/user/${user.data._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    {
        onSuccess: (data) => {
            setMessage("Email changed successfully");
            setEmail('');
            handleClose();
            queryClient.invalidateQueries('profileData');
        },
        onError: (error) => {
            setMessage("Error changing email");
        },
    });  



    const handleSubmission = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setMessage('email valitdation passed');
            emailMutation.mutate(email);
        }else if(email === ''){
            setMessage('Email cannot be empty');  
        }else {
            setMessage('Invalid Email');
        }
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
                        sx={{}}
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
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: isMobile ? 'column' : 'row',
                    }}>
                        <TextField
                            id="outlined-basic"
                            label="New Email"
                            variant="outlined"
                            value={email}
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                width: isMobile ? '90%' : '50%',
                                mt: 2,
                                '& label.Mui-focused': {
                                    color: theme.palette.secondary.main,
                                    borderColor: theme.palette.secondary.main,
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor:
                                            theme.palette.secondary.main,
                                    },
                            }}
                        />
                        <Button
                            sx={{
                                mt: 2,
                                py:2,
                                borderRadius: '25px',
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.typography.color,
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.secondary.light,
                                },
                            }}
                            onClick={handleSubmission}
                        >
                            Change Email
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <SnackbarEL message={message} setMessage={setMessage} />
        </>
    );
};


const ChangeNameButton = ({ user }) => {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');
    const queryClient = useQueryClient();

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

    const nameMutation = useMutation((name) => {
        const formData = new FormData();
        formData.append('name', name);
        return axios.patch(`reddit/user/${user.data._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    {
        onSuccess: (data) => {
            setMessage("Name changed successfully");
            setName('');
            handleClose();
            queryClient.invalidateQueries('profileData');
            queryClient.invalidateQueries('username');
        },
        onError: (error) => {
            setMessage("Error changing name");
        },
    });  

    const handleSubmission = () => {
        if(name === ''){
            setMessage('Name cannot be empty');  
        }else {
            setMessage('Name validation passed');
            nameMutation.mutate(name);
        }
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
                Change User Name
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Change-Name-Modal"
                aria-describedby="Modal-for-changing-name"
            >
                <Box sx={style}>
                    <Typography
                        id="Change-Name-Modal"
                        variant="h6"
                        component="h2"
                        sx={{}}
                    >
                        Change Name
                    </Typography>
                    <Typography
                        id="Modal-for-changing-name"
                        variant="body1"
                        component="div"
                        sx={{
                            mt: 2,
                        }}
                    >
                        Your current name is: {user.data.name}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: isMobile ? 'column' : 'row',
                    }}>
                        <TextField
                            id="outlined-basic"
                            label="New Name"
                            variant="outlined"
                            value={name}
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                width: isMobile ? '90%' : '50%',
                                mt: 2,
                                '& label.Mui-focused': {
                                    color: theme.palette.secondary.main,
                                    borderColor: theme.palette.secondary.main,
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor:
                                            theme.palette.secondary.main,
                                    },
                            }}
                        />
                        <Button
                            sx={{
                                mt: 2,
                                py:2,
                                borderRadius: '25px',
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.typography.color,
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.secondary.light,
                                },
                            }}
                            onClick={handleSubmission}
                        >
                            Change Name
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <SnackbarEL message={message} setMessage={setMessage} />
        </>
    );
};

const ChangePasswordButton = ({ user }) => {
    const [open, setOpen] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const queryClient = useQueryClient();

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

    const passwordMutation = useMutation(() => {
        const data = {
            name: user.data.name,
            email: user.data.email,
            passwordCurrent: currentPassword,
            password: newPassword,
            appType: 'reddit'
        };
        return axios.patch(`user/updateMyPassword`, data);
    },
    {
        onSuccess: (data) => {
            setMessage("Password changed successfully");
            setCurrentPassword('');
            setNewPassword('');
            handleClose();
            queryClient.invalidateQueries('profileData');
        },
        onError: (error) => {
            setMessage("Error changing password");
        },
    });  

    const handleSubmission = () => {
        if(currentPassword === '' || newPassword === ''){
            setMessage('Current password and new password cannot be empty');  
        }else {
            passwordMutation.mutate();
        }
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
                Change Password
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Change-Password-Modal"
                aria-describedby="Modal-for-changing-password"
            >
                <Box sx={style}>
                    <Typography
                        id="Change-Password-Modal"
                        variant="h6"
                        component="h2"
                    >
                        Change Password
                    </Typography>
                    <Divider sx={{mb:2}} />
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }}>
                        <TextField
                            id="current-password"
                            label="Current Password"
                            variant="outlined"
                            type="password"
                            value={currentPassword}
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            sx={{
                                width: isMobile ? '90%' : '50%',
                                mt: 2,
                                '& label.Mui-focused': {
                                    color: theme.palette.secondary.main,
                                    borderColor: theme.palette.secondary.main,
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor:
                                            theme.palette.secondary.main,
                                    },
                            }}
                        />
                        <TextField
                            id="new-password"
                            label="New Password"
                            variant="outlined"
                            type="password"
                            value={newPassword}
                            autoComplete="off"
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={{
                                width: isMobile ? '90%' : '50%',
                                mt: 2,
                                '& label.Mui-focused': {
                                    color: theme.palette.secondary.main,
                                    borderColor: theme.palette.secondary.main,
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor:
                                            theme.palette.secondary.main,
                                    },
                            }}
                        />
                        <Button
                            sx={{
                                mt: 2,
                                py:2,
                                borderRadius: '25px',
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.typography.color,
                                '&:hover': {
                                    backgroundColor:
                                        theme.palette.secondary.light,
                                },
                            }}
                            onClick={handleSubmission}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <SnackbarEL message={message} setMessage={setMessage} />
        </>
    );
};


export default Account;
