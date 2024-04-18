'use client';
import React, { useState, useContext, useEffect } from 'react';
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
    Menu,
    MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@emotion/react';
import PopupState, {
    bindToggle,
    bindPopper,
    bindMenu,
} from 'material-ui-popup-state';

import SnackbarEL from '../Notification_Components/SnachBarEL';
import PostHelper from './PostHelper';
import { Soono } from '@/public/assets';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from '@/utility/axiosConfig';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const PostEl = ({ post }) => {
    const theme = useTheme();
    const { isUserAuthenticated, authState } = useContext(AuthContext);
    const createdAt = moment(post.createdAt).fromNow();

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
                    avatar={
                        <AvatarEl
                            user={post.author?.profileImage}
                            author={post.author}
                        />
                    }
                    title={`u/${post.author.name}`}
                    subheader={
                        post.channel?.name ? `r/${post.channel?.name}` : ''
                    }
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                    }}
                >
                    {isUserAuthenticated() && (
                        <CardActions>
                            {authState?.userInfo?._id !== post.author._id && (
                                <IconButtonWithPopper
                                    userId={post.author._id}
                                    name={post.author.name}
                                />
                            )}
                        </CardActions>
                    )}
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{
                            marginRight: isUserAuthenticated() ? '0' : '10px',
                        }}
                    >
                        {createdAt}
                    </Typography>
                </Box>
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

const IconButtonWithPopper = ({ userId, name }) => {
    const queryClient = useQueryClient();
    const [isFollowed, setIsFollowed] = useState(false);
    const [message, setMessage] = useState('');
    const theme = useTheme();
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
            onSettled: () => {
                queryClient.invalidateQueries(['userData', userId]);
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
            onSettled: () => {
                queryClient.invalidateQueries(['userData', userId]);
            },
        },
    );

    const { data: user, isLoading: isUserLoading } = useQuery(
        ['userData', userId],
        () => axios.get(`reddit/user/${userId}`),
    );

    useEffect(() => {
        user && setIsFollowed(user?.data?.data?.isFollowed);
    }, [user]);

    const handleFollow = (close) => {
        followMutation.mutate();
        close();
    };

    const handleUnfollow = (close) => {
        unfollowMutation.mutate();
        close();
    };

    if (isUserLoading) return null;

    return (
        <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
                <div>
                    <IconButton
                        {...bindToggle(popupState)}
                        sx={{
                            color: theme.palette.typography.color,
                        }}
                    >
                        <MoreVertIcon />
                        <SnackbarEL message={message} setMessage={setMessage} />
                    </IconButton>

                    <Menu
                        {...bindMenu(popupState)}
                        transition
                        sx={{
                            p : 1,
                        }}
                    >
                        
                        <Typography sx={{
                            px: 2,
                            py: 1,
                        }}>{isFollowed ? `Unfollow ${name}` : `Follow ${name}`}</Typography>
                        
                        {isFollowed ? (
                            <MenuItem
                                onClick={() => handleUnfollow(popupState.close)}
                                sx={{
                                    display: 'flex',    
                                    justifyContent: 'center',
                                }}
                            >
                                Unfollow
                            </MenuItem>
                        ) : (
                            <MenuItem
                                onClick={() => handleFollow(popupState.close)}
                                sx={{
                                    display: 'flex',    
                                    justifyContent: 'center',
                                }}
                            >
                            
                                Follow
                            </MenuItem>
                        )}
                    </Menu>
                </div>
            )}
        </PopupState>
    );
};

const AvatarEl = ({ user, author }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const avatarSize = isSmallScreen ? 35 : 40; // You can adjust these values as needed
    const router = useRouter();
    const { authState, isUserAuthenticated } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const handleAvatarClick = () => {
        if (isUserAuthenticated()) {
            if (author._id === authState?.userInfo?._id) {
                router.push(`/profile/${author._id}`);
            } else {
                router.push(`/u/${author._id}`);
            }
        } else {
            setMessage('Please login to view profile');
            router.push('/signIn');
        }
    };

    if (user === null) {
        return (
            <Avatar
                onClick={handleAvatarClick}
                sx={{
                    width: avatarSize,
                    height: avatarSize,
                    bgcolor: theme.palette.secondary.main,
                    cursor: 'pointer',
                }}
            >
                <Image
                    src={Soono}
                    alt="Profile Icon"
                    width={avatarSize}
                    height={avatarSize}
                />
                <SnackbarEL message={message} setMessage={setMessage} />
            </Avatar>
        );
    }
    return (
        <>
            <Avatar
                src={user}
                sx={{
                    width: avatarSize,
                    height: avatarSize,
                    cursor: 'pointer',
                }}
                onClick={handleAvatarClick}
            />
            <SnackbarEL message={message} setMessage={setMessage} />
        </>
    );
};

export default PostEl;
