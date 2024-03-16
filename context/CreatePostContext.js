'use client';
import React, { createContext, useState } from 'react';
import { useMutation } from 'react-query';
import axios from '@/utility/axiosConfig';
import { useRouter } from 'next/navigation';

// Create Context Object
export const CreatePostContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CreatePostContextProvider = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [community, setCommunity] = useState("");
    const Router = useRouter();

    const mutation = useMutation(
        () => {
            // Create a FormData instance
            const formData = new FormData();

            // Append the title, content, and image to the form data
            formData.append('title', title);
            formData.append('content', content);
            formData.append('channel', community._id);
            formData.append('images', 'postImage'); // replace 'postImage' with the actual File or Blob object

            // Send a POST request with the form data
            return axios.post('/reddit/post/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        {
            onSuccess: () => {
                // Reset the form fields when the mutation is successful
                setTitle('');
                setContent('');
                setCommunity('');
                setIsSuccessful(true);
                setSnackbarMessage('Post created successfully');
                setSnackbarOpen(true);
                setTimeout(() => {
                    Router.push('/');
                }, 2000);
            },
            onError: (error) => {
                // Handle the error case
                console.error('Error posting data:', error);
                setIsSuccessful(false);
                setSnackbarMessage('Post creation failed');
                setSnackbarOpen(true);
            },
            onSettled: (data, error) => {
                // This callback is called regardless of whether the mutation was successful or not
                if (error) {
                    console.log('Mutation failed with error:', error);
                } else {
                    console.log('Mutation was successful with data:', data);
                }
            },
        },
    );
    // useEffect(() => {
    //     console.log("Title: ", title);
    //     console.log("Content: ", content);
    // }, [title, content]);
    const handlePost = () => {
        if (title.trim() === '' || JSON.stringify(content).trim() === '') {
            setSnackbarMessage('Title or content is empty');
            setSnackbarOpen(true);
            return;
        }
        mutation.mutate();
    };

    return (
        <CreatePostContext.Provider
            value={{
                title,
                setTitle,
                content,
                setContent,
                handlePost,
                isSuccessful,
                snackbarMessage,
                snackbarOpen,
                setSnackbarOpen,
                community,
                setCommunity,
            }}
        >
            {props.children}
        </CreatePostContext.Provider>
    );
};
