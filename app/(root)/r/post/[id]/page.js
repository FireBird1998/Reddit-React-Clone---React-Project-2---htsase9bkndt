'use client';
import { useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient, useQueries } from 'react-query';
import axios from '@/utility/axiosConfig';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
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
import { AuthContext } from '@/context/AuthContext';
import { useAuthRedirect } from '@/hooks';
import DeleteIcon from '@mui/icons-material/Delete';

const page = () => {
    const [comment, setComment] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const queryClient = useQueryClient();
    const { id } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { authState, isUserAuthenticated } = useContext(AuthContext);

    const userID = authState?.userInfo?._id;

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

    const deleteCommentRequest = async (commentId) => {
        const { data } = await axios.delete(`/reddit/comment/${commentId}`);
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

    const deleteCommentMutation = useMutation(
        'deleteComment',
        deleteCommentRequest,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('comments');
                queryClient.invalidateQueries('post');
                setSnackbarMessage('Comment Deleted');
                setSnackbarOpen(true);
            },
            onError: (error) => {
                console.error(error);
                setSnackbarMessage(error.message);
                setSnackbarOpen(true);
            },
        },
    );

    const handleDeleteComment = (commentId) => {
        deleteCommentMutation.mutate(commentId);
    };

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
                            <Box
                                display="flex"
                                flexDirection={isMobile ? 'column' : 'row'}
                                justifyContent="space-between"
                                alignItems={isMobile ? 'flex-start' : 'center'}
                            >
                                <div>
                                    <Typography variant="h6" sx={{ mb: 2}} fontWeight={500}>
                                        {comment.author_details.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {comment.content}
                                    </Typography>
                                </div>
                                {userID === comment.author && (
                                    <Button
                                        variant="filled"
                                        onClick={() =>
                                            handleDeleteComment(comment._id)
                                        }
                                        sx={{
                                            bgcolor:
                                                theme.palette.secondary.main,
                                            color: theme.palette.typography,
                                            mt: isMobile ? 2 : 0,
                                            '&:focus': {
                                                outline: 'none',
                                                bgcolor:
                                                    theme.palette.secondary
                                                        .main,
                                            },
                                            '&:hover': {
                                                bgcolor:
                                                    theme.palette.secondary
                                                        .dark,
                                            },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                )}
                            </Box>
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
            lg={8}
            xl={6}
            sx={{
                width: '100%',
            }}
        >
            <PostEl post={data} />
            <Divider />
            {isUserAuthenticated() && (
                <Paper elevation={3} sx={{ p: 2, my: 2 }}>
                    {createComment()}
                </Paper>
            )}
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
