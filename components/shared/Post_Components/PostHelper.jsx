'use client';
import {
    ArrowUpwardOutlined,
    ArrowDownwardOutlined,
    ArrowUpward,
    ArrowDownward,
    CommentOutlined,
    DeleteForever,
} from '@mui/icons-material';
import {
    CardActions,
    IconButton,
    Badge,
    Snackbar,
    Paper,
    Divider,
    Box,
} from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import axios from '@/utility/axiosConfig';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { useEffect, useContext, useState } from 'react';
import { useTheme } from '@emotion/react';

import React from 'react';
import PostUpdateModal from './PostUpdateModal';

const PostHelper = ({ post }) => {
    const { isUserAuthenticated, authState } = useContext(AuthContext);
    const [disLikeLike, setDisLikeLike] = useState(
        post.likeCount - post.dislikeCount,
    );
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const queryClient = useQueryClient();
    const Router = useRouter();
    const theme = useTheme();

    const deletePostRequest = async () => {
        const response = await axios.delete(`/reddit/post/${post._id}`);
        if (response.status !== 204) {
            console.error('Post not deleted');
            throw new Error('Post not deleted');
        }

        return response.data;
    };

    const handleUpVote = () => {
        if (isUserAuthenticated()) {
            upVote.mutate();
        } else {
            setSnackbarMessage('Please login to upvote');
            setSnackbarOpen(true);

            Router.push('/signIn');
        }
    };

    const handleDownVote = () => {
        if (isUserAuthenticated()) {
            downVote.mutate();
        } else {
            setSnackbarMessage('Please login to downvote');
            setSnackbarOpen(true);

            Router.push('/signIn');
        }
    };

    const handleComment = () => {
        if (isUserAuthenticated()) {
            Router.push(`/r/post/${post._id}`);
        } else {
            setSnackbarMessage('Please login to comment');
            setSnackbarOpen(true);

            Router.push('/signIn');
        }
    };

    const handleDelete = () => {
        if (isUserAuthenticated()) {
            deletePost.mutate();
            Router.push('/');
        } else {
            setSnackbarMessage('Please login to delete post');
            setSnackbarOpen(true);

            Router.push('/signIn');
        }
    };

    // Define a function named handleShare
    const handleShare = () => {
        // Check if the Web Share API is available in the user's browser
        if (navigator.share) {
            // If it is, call the share method with an object containing the data to be shared
            navigator
                .share({
                    // The URL of the content to be shared, constructed from the current origin and the post's ID
                    url: `${window.location.origin}/r/post/${post._id}`,
                })
                // If the share action is successful, log a message to the console
                .then(() => {
                    console.log('Shared successfully');
                    snackbarMessage('Post shared successfully');
                    setSnackbarOpen(true);
                })
                // If there's an error (e.g., the user cancels the share), log the error to the console
                .catch((error) => {
                    console.error('Error sharing:', error);
                });
        } else {
            // If the Web Share API is not supported in the user's browser, log an error message to the console
            console.error('Web share not supported');
            setSnackbarMessage('Web share not supported');
            setSnackbarOpen(true);
        }
    };

    const upVote = useMutation(
        () => {
            return axios.post(`/reddit/like/${post._id}`);
        },
        {
            onSuccess: (data) => {
                // console.log('Post upvoted ' + data.data);
                setSnackbarMessage(data.data.message);
                setSnackbarOpen(true);
                setIsLiked(true);
                if (isDisliked) {
                    setIsDisliked(false);
                }
            },
            onError: (error) => {
                console.error('Error upvoting post:', error);
                setSnackbarMessage(error.response.data.message);
                setSnackbarOpen(true);
                if (
                    error.response.data.message ===
                    'You already liked this post'
                ) {
                    setIsLiked(true);
                    setIsDisliked(false);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(['likeCount', post._id]);
            },
        },
    );

    const downVote = useMutation(
        () => {
            return axios.delete(`/reddit/like/${post._id}`);
        },
        {
            onSuccess: (data) => {
                // console.log('Post downvoted ' + data.data);
                setSnackbarMessage(data.data.message);
                setSnackbarOpen(true);
                setIsDisliked(true);
                if (isLiked) {
                    setIsLiked(false);
                }
            },
            onError: (error) => {
                // console.error('Error downvoting post:', error);
                setSnackbarMessage(error.response.data.message);
                setSnackbarOpen(true);
                if (
                    error.response.data.message ===
                    `You haven't liked this post yet`
                ) {
                    setIsDisliked(true);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(['likeCount', post._id]);
            },
        },
    );

    const deletePost = useMutation(deletePostRequest, {
        onSuccess: (data) => {
            console.log('Post deleted');
            queryClient.invalidateQueries('posts');
            setSnackbarMessage('Post deleted successfully');
            setSnackbarOpen(true);
        },
        onError: (error) => {
            console.error('Error deleting post:', error);
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        },
        onSettled: () => {},
    });

    const { error, isError } = useQuery(
        ['likeCount', post._id],
        async () => {
            const { data } = await axios.get(`/reddit/post/${post._id}`);
            return data.data;
        },
        {
            onSuccess: (data) => {
                let ratio = data.likeCount - data.dislikeCount;
                setDisLikeLike(ratio);
                setIsLiked(data.isLiked);
                setIsDisliked(data.isDisliked);
            },
        },
    );

    const upvoteDownvote = () => {
        return (
            <Paper
                elevation={3}
                sx={{
                    padding: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    backgroundColor: theme.palette.primary.main,
                }}
            >
                <IconButton
                    aria-label="upvote"
                    onClick={() => handleUpVote()}
                    disabled={isLiked}
                    sx={{
                        color: isLiked
                            ? theme.palette.secondary.main
                            : theme.palette.text.primary,
                        '&.Mui-disabled': {
                            color: theme.palette.secondary.main,
                        },
                    }}
                >
                    <ArrowUpward />
                </IconButton>
                {disLikeLike}
                <IconButton
                    aria-label="downvote"
                    onClick={() => handleDownVote()}
                    disabled={isDisliked}
                    sx={{
                        color: isDisliked
                            ? theme.palette.secondary.main
                            : theme.palette.text.primary,
                        '&.Mui-disabled': {
                            color: theme.palette.secondary.main,
                        },
                    }}
                >
                    <ArrowDownwardOutlined />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton
                    aria-label="comment"
                    onClick={() => handleComment()}
                    sx={{
                        color: theme.palette.text.primary,
                        '&:hover': {
                            color: theme.palette.secondary.main,
                        },
                    }}
                >
                    <Badge badgeContent={post.commentCount} color="secondary">
                        <CommentOutlined />
                    </Badge>
                </IconButton>
                <IconButton
                    aria-label="share"
                    onClick={() => handleShare()}
                    sx={{
                        color: theme.palette.text.primary,
                        '&:hover': {
                            color: theme.palette.secondary.main,
                        },
                    }}
                >
                    <ShareOutlinedIcon />
                </IconButton>
            </Paper>
        );
    };

    const userSpecificELements = () => {
        if (
            isUserAuthenticated() &&
            authState.userInfo._id === post.author._id
        ) {
            return (
                <Paper
                    elevation={3}
                    sx={{
                        padding: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                        backgroundColor: theme.palette.primary.main,
                    }}
                >
                    <IconButton
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                color: theme.palette.secondary.main,
                            },
                        }}
                        aria-label="delete"
                        onClick={() => handleDelete()}
                    >
                        <DeleteForever />
                    </IconButton>
                    <PostUpdateModal
                        post={post}
                        setSnackbarMessage={setSnackbarMessage}
                        setSnackbarOpen={setSnackbarOpen}
                    />
                </Paper>
            );
        }
    };

    if (isError) {
        console.error('Error fetching like count:', error);
    }

    return (
        <CardActions disableSpacing>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                }}
            >
                {upvoteDownvote()}
                {userSpecificELements()}
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                message={snackbarMessage}
                onClose={() => setSnackbarOpen(false)}
            />
        </CardActions>
    );
};

export default PostHelper;
