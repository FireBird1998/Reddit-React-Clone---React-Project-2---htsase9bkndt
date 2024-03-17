import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, TextField, Paper, Snackbar, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import axios from '@/utility/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';
import { useMediaQuery } from '@mui/material';




const PostUpdateModal = ({ post, setSnackbarMessage, setSnackbarOpen }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(post?.title || '');
    const [content, setContent] = React.useState(post?.content || '');
    const theme = useTheme();
    const queryClient = useQueryClient();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '100%' : 500, // Adjust the width based on the screen size
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const mutatePost = useMutation(
        async () => {
            console.log('patching post');
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            // If you have images as File objects, append them like this:
            // images.forEach((image, index) => {
            //     formData.append(`images[${index}]`, image);
            // });

            const response = await axios.patch(`/reddit/post/${post._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('posts');
                queryClient.invalidateQueries('post');
                setSnackbarMessage('Post updated successfully');
                setSnackbarOpen(true);
                setTimeout(() => {
                    handleClose();
                }, 500);
            },
            onError: (error) => {
                console.log(error);
                setSnackbarMessage('Error updating post');
                setSnackbarOpen(true);
            },
        },
    );

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handlePost = () => {
        if (title.length > 0 && content.length > 0) {
            mutatePost.mutate();
        } else {
            setSnackbarMessage('Title and content cannot be empty');
            setSnackbarOpen(true);
        }
    };

    return (
        <div>
            <IconButton onClick={handleOpen} aria-label="edit post">
                <EditIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                keepMounted
            >
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Update Post
                    </Typography>
                    <Divider />
                    <TextField
                        id="post-title"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={handleTitleChange}
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
                    <TextField
                        id="post-content"
                        label="Content"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={handleContentChange}
                        multiline
                        rows={4}
                        sx={{
                            width: '100%',
                            mt: 2,
                            mb: 2,
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
                    <Button
                        variant="filled"
                        sx={{
                            bgcolor: theme.palette.secondary.main,
                            color: theme.palette.typography,
                        }}
                        onClick={() => handlePost()}
                    >
                        Update Post
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default PostUpdateModal;
