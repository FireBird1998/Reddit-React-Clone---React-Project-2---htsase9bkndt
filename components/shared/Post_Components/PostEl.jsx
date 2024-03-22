'use client';
import React, { useState, useContext } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    CardMedia,
    Avatar,
    IconButton,
    Typography,
    Divider,
    Box,
    Popper,
    Fade,
    Paper,
    useMediaQuery,
    Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@emotion/react';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

import SnackbarEL from '../Notification_Components/SnachBarEL';
import PostHelper from './PostHelper';
import { Soono } from '@/public/assets';
import Image from 'next/image';
import { useMutation } from 'react-query';
import axios from '@/utility/axiosConfig';
import { AuthContext } from '@/context/AuthContext';

const PostEl = ({ post }) => {
    const theme = useTheme();
    const { isUserAuthenticated, authState } = useContext(AuthContext);
    return (
        <Card
            sx={{
                my: 2,
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <CardHeader
                    avatar={<AvatarEl user={post.author?.profileImage} />}
                    title={post.author.name}
                    subheader={post.channel?.name}
                />

                {isUserAuthenticated() && (
                    <CardActions>
                        {authState?.userInfo?._id !== post.author._id && (
                            <IconButtonWithPopper userId={post.author._id} name={post.author.name} />
                        )}
                    </CardActions>
                )}
            </Box>
            <Divider />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="body1">{post.content}</Typography>
                {post.images[0] && (
                    <CardMedia
                        component="img"
                        image={post.images[0]}
                        alt={post.title}
                        sx={{
                            width: '100%',
                            mt: 2,
                            borderRadius: '10px',
                            objectFit: 'contain',
                        }}
                    />
                )}
            </CardContent>
            <PostHelper post={post} />
        </Card>
    );
};

const IconButtonWithPopper = ({ userId , name }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [message, setMessage] = useState('');
    const followMutation = useMutation(
        () => {
            return axios.post(`reddit/follow/${userId}`);
        },
        {
            onSuccess: (data) => {
                setIsFollowed(true);
                setMessage(`Followed ${name}`);
            },
            onError: (error) => {
                if (
                    error.response.data.message ===
                    `You're already following this user`
                ) {
                    setIsFollowed(true);
                    setMessage(`You're already following ${name}`);
                } else {
                    console.error('Error from PostEL follow mutation', error);
                }
            },
        },
    );
    const unfollowMutation = useMutation(
        () => {
            return axios.delete(`reddit/follow/${userId}`);
        },
        {
            onSuccess: (data) => {
                console.log('unfollowed', data);
                setMessage(`Unfollowed ${name}`);
                setIsFollowed(false);
            },
            onError: (error) => {
                console.error('Error from PostEL unfollow mutation', error);
            },
        },
    );

    const handleFollow = () => {
        followMutation.mutate();
    };

    const handleUnfollow = () => {
        unfollowMutation.mutate();
    };

    return (
        <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
                <div>
                    <IconButton {...bindToggle(popupState)}>
                        <MoreVertIcon />
                        <SnackbarEL message={message} setMessage={setMessage} />
                    </IconButton>
                    <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper
                                    sx={{
                                        p: 2,
                                    }}
                                >
                                    <Typography>Follow the {name}</Typography>
                                    {isFollowed ? (
                                        <Button
                                            sx={{
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.4)',
                                                mt: 1,
                                            }}
                                            variant="contained"
                                            disableElevation
                                            onClick={handleUnfollow}
                                        >
                                            <Typography>Unfollow</Typography>
                                        </Button>
                                    ) : (
                                        <Button
                                            sx={{
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.4)',
                                                mt: 1,
                                            }}
                                            variant="contained"
                                            disableElevation
                                            onClick={handleFollow}
                                        >
                                            <Typography>Follow</Typography>
                                        </Button>
                                    )}
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            )}
        </PopupState>
    );
};

const AvatarEl = ({ user }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const avatarSize = isSmallScreen ? 35 : 40; // You can adjust these values as needed

    if (user === null) {
        return (
            <Avatar
                sx={{
                    width: avatarSize,
                    height: avatarSize,
                    bgcolor: theme.palette.secondary.main,
                }}
            >
                <Image
                    src={Soono}
                    alt="Profile Icon"
                    width={avatarSize}
                    height={avatarSize}
                />
            </Avatar>
        );
    }
    return <Avatar src={user} sx={{ width: avatarSize, height: avatarSize }} />;
};

export default PostEl;
