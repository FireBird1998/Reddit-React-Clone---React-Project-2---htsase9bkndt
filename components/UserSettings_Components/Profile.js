import {
    Box,
    Typography,
    Divider,
    Card,
    CardMedia,
    Modal,
    useMediaQuery,
    TextField,
    Button,
} from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '@/utility/axiosConfig';
import SnackbarEL from '../shared/Notification_Components/SnachBarEL';

const Profile = ({ user }) => {
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
                Profile settings
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
                Profile Preferences
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
                        Profile Picture
                    </Typography>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={user.data.profileImage}
                            alt="Profile Picture"
                        />
                    </Card>
                </Box>
                <ChangeProfileImageButton user={user} />
            </Box>
        </Box>
    );
};

const ChangeProfileImageButton = ({ user }) => {
    const [open, setOpen] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState('');
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

    const imageMutation = useMutation((imageUrl) => {
        const formData = new FormData();
        formData.append('profileImage', imageUrl);
        return axios.patch(`reddit/user/${user.data._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    {
        onSuccess: (data) => {
            setMessage("Profile image changed successfully");
            setImageUrl('');
            handleClose();
            queryClient.invalidateQueries('profileData');
        },
        onError: (error) => {
            setMessage("Error changing profile image");
        },
    });  

    const handleSubmission = () => {
        if(imageUrl === ''){
            setMessage('Image URL cannot be empty');  
        }else {
            setMessage('Image URL validation passed');
            imageMutation.mutate(imageUrl);
        }
    };

    return (
        <>
            <Button
                sx={{
                    ml: 'auto',
                    borderRadius: '25px',
                    height: '40px',
                    mt: 2,
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.typography.color,
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.light,
                    },
                }}
                onClick={handleOpen}
            >
                Change Profile Image
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Change-Profile-Image-Modal"
                aria-describedby="Modal-for-changing-profile-image"
            >
                <Box sx={style}>
                    <Typography
                        id="Change-Profile-Image-Modal"
                        variant="h6"
                        component="h2"
                        sx={{}}
                    >
                        Change Profile Image
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: isMobile ? 'column' : 'row',
                    }}>
                        <TextField
                            id="outlined-basic"
                            label="New Image URL"
                            variant="outlined"
                            value={imageUrl}
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => setImageUrl(e.target.value)}
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
                            Change Image
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <SnackbarEL message={message} setMessage={setMessage} />
        </>
    );
};


export default Profile;
