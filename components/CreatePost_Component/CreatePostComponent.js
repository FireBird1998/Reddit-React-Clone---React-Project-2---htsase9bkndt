'use client';
import React, { useContext, useEffect } from 'react';
import LexicalEditorEl from './LexicalEditorEl';
import {
    Box,
    Divider,
    Paper,
    Typography,
    TextField,
    Button,
    Snackbar,
    Card,
    CardMedia,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { CreatePostContext } from '@/context/CreatePostContext';
import SelectCommunity from './SelectCommunity';
import ImageUploadDialog from './ImageUploadDialog';
import Image from 'next/image';

//interview question 
function feedWord(content) {
    const words = content.split(' ');

    for(let i = 0; i < words.length; i++) {
        const word = words[i];
        if (checkForAbouse(word)) {
            words[i] = 'AbouseWord';
        }
    }
    return words.join(' ');
    
}

function checkForAbouse(word) {
    const badWords = [
        'xyz',
    ]

    const lowerCaseWord = word.toLowerCase();
    if (badWords.includes(lowerCaseWord)) {
        return true;
    }

    
    return false;
    
}



const CreatePostComponent = () => {
    const theme = useTheme();
    const {
        title,
        setTitle,
        content,
        setContent,
        handlePost,
        snackbarOpen,
        snackbarMessage,
        setSnackbarOpen,
        fileData,
    } = useContext(CreatePostContext);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    // useEffect(() => {
    //    let newContent = feedWord(content);
    //     console.log(newContent);
    // }, [content]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    p: 2,
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    sx={{ color: theme.palette.typography }}
                >
                    Create a Post
                </Typography>
                <SelectCommunity />
                <Divider />
                <TextField
                    id="outlined-basic"
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
                    autoFocus
                    autoComplete='off'
                />
                <TextField
                    id="outlined-textarea"
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
                {fileData && (
                    <Card sx={{my: 3}}>
                        <CardMedia
                            component="img"
                            image={URL.createObjectURL(fileData)}
                        />
                    </Card>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
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
                        Post
                    </Button>
                    <ImageUploadDialog />
                </Box>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                message={snackbarMessage}
                onClose={() => setSnackbarOpen(false)}
            />
        </Box>
    );
};

export default CreatePostComponent;
