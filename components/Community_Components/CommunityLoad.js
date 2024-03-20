import React from 'react';
import { useQuery } from 'react-query';
import { getChannelPosts } from '@/app/action';
import { LinearProgress, Stack, Typography } from '@mui/material';
import PostEl from '../shared/Post_Components/PostEl';

const CommunityLoad = ({ communityId }) => {
    const { data, isLoading, isError } = useQuery(
        ['channelPosts', communityId],
        () => getChannelPosts(communityId),
    );

    if (isLoading) {
        return (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />
            </Stack>
        );
    }

    if (isError) {
        return <div>Error loading posts</div>;
    }

    if (data?.length === 0) {
        return <Typography variant='h1'>No posts found in this Community</Typography>;
    
    }

    return (
        <div>
            {data?.map((post) => (
                <PostEl key={post.id} post={post} />
            ))}
        </div>
    );
};

export default CommunityLoad;
