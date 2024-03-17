'use client';
import {
    ArrowUpwardOutlined,
    ArrowDownwardOutlined,
    ArrowUpward,
    ArrowDownward,
    CommentOutlined,
} from '@mui/icons-material';
import {
    CardActions,
    IconButton,
    Badge,
    Snackbar,
    Paper,
    Divider,
} from '@mui/material';
import axios from '@/utility/axiosConfig';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { useEffect, useContext, useState } from 'react';
import { useTheme } from '@emotion/react';

import React from 'react';

const PostHelper = ({ post }) => {
    const { isUserAuthenticated } = useContext(AuthContext);
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

    const handleUpVote = () => {
        if (isUserAuthenticated()) {
            upVote.mutate();
        } else {
            setSnackbarMessage('Please login to upvote');
            setSnackbarOpen(true);
            setTimeout(() => {
                Router.push('/auth/signin');
            }, 2000);
        }
    };
    const handleDownVote = () => {
        if (isUserAuthenticated()) {
            downVote.mutate();
        } else {
            setSnackbarMessage('Please login to downvote');
            setSnackbarOpen(true);
            setTimeout(() => {
                Router.push('/auth/signin');
            }, 2000);
        }
    };

    const handleComment = () => {
        if (isUserAuthenticated()) {
            Router.push(`/r/post/${post._id}`);
        } else {
            setSnackbarMessage('Please login to comment');
            setSnackbarOpen(true);
            setTimeout(() => {
                Router.push('/auth/signin');
            }, 2000);
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

    const { data, error, isError } = useQuery(
        ['likeCount', post._id],
        async () => {
            const { data } = await axios.get(`/reddit/post/${post._id}`);
            return data.data;
        },
        {
            onSuccess: (data) => {
                let ratio = data.likeCount - data.dislikeCount;
                setDisLikeLike(ratio);
            },
        },
    );

    const upvoteDownvote = () => {
        return (
            <Paper
                elevation={5}
                sx={{
                    padding: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
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
                <IconButton aria-label="comment" onClick={() => handleComment()}>
                    <Badge badgeContent={post.commentCount} color="secondary">
                        <CommentOutlined />
                    </Badge>
                </IconButton>
            </Paper>
        );
    };

    if (isError) {
        console.error('Error fetching like count:', error);
    }

    return (
        <CardActions disableSpacing>
            {upvoteDownvote()}
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

// const getComments = useQuery(
//     ['comments', post._id],
//     async () => {
//         const { data } = await axios.get(`/reddit/post/${post._id}/comments`);
//         return data.data;
//     },
// );
// const postComment = useMutation(
//     () => {

//     }
// );
