'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from '@/utility/axiosConfig';
import { useTheme } from '@emotion/react';
import {
    Box,
    Typography,
    Grid,
    LinearProgress,
    Divider,
    Paper,
    TextField,
    Button,
    Snackbar,
} from '@mui/material';
import PostEl from '@/components/shared/Post_Components/PostEl';

const page = () => {
    const [comment, setComment] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const queryClient = useQueryClient();
    const { id } = useParams();
    const theme = useTheme();
    const fetchPost = async () => {
        const { data } = await axios.get(`/reddit/post/${id}`);
        return data.data;
    };
    const fetchComments = async () => {
        const { data } = await axios.get(`/reddit/post/${id}/comments`);
        return data.data;
    };
    const createCommentRequest = async (comment) => {
        const { data } = await axios.post(`/reddit/comment/${id}`, {
            content: comment,
        });
        return data.data;
    };
    const { data, isLoading, isError, error } = useQuery('post', fetchPost);

    const {
        data: comments,
        isLoading: isLoadingComments,
        isError: isErrorComments,
        error: errorComments,
    } = useQuery('comments', fetchComments);

    const createCommentMutation = useMutation(
        'createComment',
        createCommentRequest,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('comments');
                queryClient.invalidateQueries('post');
                setSnackbarMessage('Comment Created');
                setSnackbarOpen(true);
                setComment('');
            },
            onError: (error) => {
                console.error(error);
                setSnackbarMessage(error.message);
                setSnackbarOpen(true);
            },
        },
    );

    const handleComment = () => {
        if (comment.length > 0) {
            createCommentMutation.mutate(comment);
        } else {
            setSnackbarMessage('Comment cannot be empty');
            setSnackbarOpen(true);
        }
    };

    const commentEL = () => {
        if (isLoadingComments) {
            return (
                <Box sx={{ my: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: theme.palette.secondary.main }}
                    >
                        Loading...
                    </Typography>
                    <LinearProgress color="secondary" />
                </Box>
            );
        }
        if (isErrorComments) {
            return (
                <Box sx={{ my: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: theme.palette.secondary.main }}
                    >
                        Error: {errorComments.message}
                    </Typography>
                </Box>
            );
        }
        return (
            <Box sx={{ my: 2 }}>
                <Typography variant="h5" sx={{ p: 2 }}>
                    Comments
                </Typography>
                <Divider />
                <Box sx={{ p: 2 }}>
                    {comments.map((comment) => (
                        <Paper key={comment._id} sx={{ p: 2, my: 2 }}>
                            <Typography variant="h6">
                                No Data, Only ID
                            </Typography>
                            <Typography variant="body1">
                                {comment.content}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>
        );
    };

    const createComment = () => {
        return (
            <Box sx={{}}>
                <Typography variant="h5" sx={{ p: 1 }}>
                    Create Comment
                </Typography>
                <Divider />
                <Box sx={{}}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{
                            width: '100%',
                            mt: 2,
                            '& label.Mui-focused': {
                                color: theme.palette.secondary.main,
                                borderColor: theme.palette.secondary.main,
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                {
                                    borderColor: theme.palette.secondary.main,
                                },
                        }}
                    />
                </Box>
                <Button
                    variant="filled"
                    onClick={() => handleComment()}
                    sx={{
                        bgcolor: theme.palette.secondary.main,
                        color: theme.palette.typography,
                        mt: 2,
                        '&:focus': {
                            outline: 'none',
                            bgcolor: theme.palette.secondary.main,
                        },
                        '&:hover': {
                            bgcolor: theme.palette.secondary.dark,
                        },
                    }}
                >
                    Post
                </Button>
            </Box>
        );
    };

    if (isLoading) {
        return (
            <Grid item xs={12}>
                <Box sx={{ my: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: theme.palette.secondary.main }}
                    >
                        Loading...
                    </Typography>
                    <LinearProgress color="secondary" />
                </Box>
            </Grid>
        );
    }
    if (isError) {
        return (
            <Grid item xs={12}>
                <Box sx={{ my: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: theme.palette.secondary.main }}
                    >
                        Error: {error.message}
                    </Typography>
                </Box>
            </Grid>
        );
    }
    return (
        <Grid
            item
            xs={12}
            sx={{
                width: '100%',
            }}
        >
            <PostEl post={data} />
            <Divider />
            <Paper elevation={3} sx={{ p: 2, my: 2 }}>
                {createComment()}
            </Paper>
            <Divider />
            <Paper elevation={3}>{commentEL()}</Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Grid>
    );
};

export default page;
