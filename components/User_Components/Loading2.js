import React from 'react';
import { Box } from '@mui/material';
import axios from '@/utility/axiosConfig';
import { useQuery } from 'react-query';
import PostEl from '../shared/Post_Components/PostEl';

const fetchUserData = async (user) => {
    // Check if user or user.data is null or undefined
    if (!user || !user.data) {
        throw new Error('User data is not available');
    }

    try {
        const res = await axios.get(
            `/reddit/post?filter={"author.name":"${user.data.name}"}`,
        );
        return res.data;
    } catch (err) {
        throw new Error('Failed to fetch user data');
    }
};

const Loading2 = ({ user, filter }) => {
    if (!user || !user.data) {
        return <Box>Loading...</Box>; // Return loading state or some other default state
    }

    // If user or user.data is null or undefined, use a falsy query key to prevent the query from running
    const queryKey = user && user.data ? ['userData', user.data._id] : null;

    const { data, isLoading, isError, error } = useQuery(
        queryKey,
        () => fetchUserData(user),
        {
            enabled: !!queryKey, // The query will not run if the query key is falsy
        },
    );

    if (isLoading) {
        return <Box>Loading...</Box>;
    }
    if (isError) {
        return <Box>Error: {error.message}</Box>;
    }

    return (
        <Box>
            {data.map((post) => (
                <PostEl key={post._id} post={post} />
            ))}
        </Box>
    );
};

export default Loading2;
