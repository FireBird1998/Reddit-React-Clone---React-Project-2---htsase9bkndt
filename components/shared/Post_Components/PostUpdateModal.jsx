'use client';
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
import Image from 'next/image';

const PostUpdateModal = ({ post, setSnackbarMessage, setSnackbarOpen }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(post?.title || '');
    const [content, setContent] = React.useState(post?.content || '');
    const [images, setImages] = React.useState(
        post?.images.length > 0 ? post.images[0] : null,
    );
    React.useEffect(() => {
        setTitle(post.title);
        setContent(post.content);
        setImages(post.images.length > 0 ? post.images[0] : null);
    }, [post]);
    const [newImages, setNewImages] = React.useState('');
    const [inputKey, setInputKey] = React.useState(Date.now());
    const [isRemoving, setIsRemoving] = React.useState(false);
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setNewImages(file);
    };
    const removeNewImage = () => {
        setNewImages(null);
        setInputKey(Date.now()); // Reset the file input field
    };
    const removeOldImage = () => {
        setImages(null);
        setIsRemoving(true);
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
            if (newImages) {
                formData.append('images', newImages);
            } else if (isRemoving) {
                formData.append('images', []);
            }

            const response = await axios.patch(
                `/reddit/post/${post._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('posts');
                queryClient.invalidateQueries('post');
                setSnackbarMessage('Post updated successfully');
                setSnackbarOpen(true);
                setNewImages(null);
                setInputKey(Date.now());
                setImages(null);
                setIsRemoving(false);
                handleClose();
                
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <TextField
                            key={inputKey}
                            type="file"
                            onChange={handleFileChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                width: '100%',
                            }}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'space-between',
                            }}
                        >
                            {images && (
                                <div>
                                    <Typography>Old Image</Typography>
                                    <Image
                                        src={images}
                                        width={150}
                                        height={150}
                                        alt="post image"
                                    />
                                </div>
                            )}
                            {newImages && (
                                <div>
                                    <Typography>New Image</Typography>
                                    <Image
                                        src={URL.createObjectURL(newImages)}
                                        width={150}
                                        height={150}
                                        alt="new post image"
                                    />
                                </div>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px',
                            mt: 2,
                        }}
                    >
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
                        {images && !newImages && (
                            <Button
                                onClick={() => removeOldImage()}
                                variant="filled"
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.secondary.main,
                                }}
                            >
                                Remove Old Image
                            </Button>
                        )}
                        {newImages && (
                            <Button
                                onClick={() => removeNewImage()}
                                variant="filled"
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.secondary.main,
                                }}
                            >
                                Remove New Image
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default PostUpdateModal;
