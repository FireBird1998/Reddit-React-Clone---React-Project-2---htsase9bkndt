import React, { useState, useEffect, useContext } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Fab,
    Grid,
    Divider,
    Box,
    Avatar,
    Button,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { useQuery } from 'react-query';
import axios from '@/utility/axiosConfig';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const fetchUserPostData = async (name) => {
    try {
        const res = await axios.get(
            `reddit/post?search={"author.name":"${name}"}`,
        );
        console.log(res.data);
        return res.data;
    } catch (err) {
        throw new Error('Failed to fetch user post data');
    }
};

const ProfileSideBar = ({ user }) => {
    const theme = useTheme();
    const router = useRouter();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const createdAt = moment(user.data.createdAt).format('MMM D, YYYY');
    const [image, setImage] = useState(
        'https://source.unsplash.com/2000x2000/?nature',
    );
    const handleClick = () => {
        // Update the image URL with a new random URL
        setImage(`https://source.unsplash.com/2000x2000/?nature,${Date.now()}`);
    };
    const {
        data: userPostData,
        isLoading: isUserPostLoading,
        isError: isUserPostError,
        error: userPostError,
    } = useQuery(['ProfileSideBar', user.data._id], () =>
        fetchUserPostData(user.data.name),
    );

    const { authState } = useContext(AuthContext);
    const [isOnewer, setIsOnewer] = useState(false);
    // console.log(user);
    // console.log(authState);

    useEffect(() => {
        if (authState.userInfo?._id === user.data?._id) {
            setIsOnewer(true);
        } else {
            setIsOnewer(false);
        }
    }, [authState, user]);

    return (
        <Card
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                position: 'relative',
                display: isMobile ? 'none' : 'block',
            }}
        >
            {isOnewer && (
                <Fab
                    size="small"
                    onClick={handleClick}
                    sx={{
                        position: 'absolute',
                        top: '5%',
                        left: '90%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor:
                            theme.mode === 'dark'
                                ? 'rgba(0,0,0,0.5)'
                                : 'rgba(255,255,255,0.5)',
                    }}
                >
                    <EditIcon />
                </Fab>
            )}
            <CardMedia
                component="img"
                height="190"
                image={image}
                alt="ProfileBackground Image"
            />

            <CardContent>
                <Typography variant="h5" component="div" sx={{ my: 2 }}>
                    {user.data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {user.data.email}
                </Typography>
                {isUserPostLoading ? (
                    <Typography>Loading...</Typography>
                ) : isUserPostError ? (
                    <Typography>{userPostError.message}</Typography>
                ) : (
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            marginTop: '10px',
                        }}
                    >
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div">
                                {userPostData.results}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Post Karma
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div">
                                {userPostData.results}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Comment Karma
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div">
                                {createdAt}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cake day
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div">
                                0
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Gold Received
                            </Typography>
                        </Grid>
                    </Grid>
                )}
                {isOnewer && <Divider sx={{ my: 2 }} />}
                {isOnewer && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            marginBottom: 2,
                        }}
                    >
                        Settings
                    </Typography>
                )}
                {isOnewer && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Avatar
                            src={user.data.profileImage}
                            alt={user.data.name}
                        />
                        <Box>
                            <Typography variant="body2">Profile</Typography>
                            <Typography variant="body2" color="text.secondary">
                                customize your profile
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                size: 'small',
                            }}
                            onClick={() => router.push(`/profile/settings/${user.data._id}`)}
                        >
                            Edit
                        </Button>
                    </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                    Links
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileSideBar;
