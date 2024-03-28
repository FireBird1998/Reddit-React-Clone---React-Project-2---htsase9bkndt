import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import PostEl from '@/components/shared/Post_Components/PostEl';
import axios from '@/utility/axiosConfig';
import { Skeleton, Divider, Stack, Typography, Box, LinearProgress } from '@mui/material';


const getPostsByFilterAndSort = async ({ pageParam = 1, filter, sort }) => {
    try {
        const filterParam = JSON.stringify(filter);
        const sortParam = JSON.stringify(sort);
        const { data } = await axios.get(
            `/reddit/post?limit=10&page=${pageParam}&filter=${filterParam}&sort=${sortParam}`,
        );

        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const Loading = ({ filter }) => {
    const fetchPosts = ({ pageParam }) => {
        switch (filter) {
            case 'hot':
                return getPostsByFilterAndSort({
                    pageParam,
                    filter: {
                        $expr: { $eq: ['$likeCount', '$dislikeCount'] },
                        'author.name': 'ankit',
                    },
                    sort: { createdAt: -1 },
                });
            case 'new':
                return getPostsByFilterAndSort({
                    pageParam,
                    filter: { 'author.name': 'ankit' },
                    sort: { createdAt: -1 },
                });
            case 'top':
                return getPostsByFilterAndSort({
                    pageParam,
                    filter: { 'author.name': 'ankit' },
                    sort: { likeCount: -1 },
                });
        }
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery(['posts', filter], fetchPosts, {
        getNextPageParam: (lastPage, pages) => {
            // Check if the last page is empty. If it is, return undefined.
            if (lastPage?.length === 0) {
                return undefined;
            }
            return pages.length + 1;
        },
    });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    React.useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <>
                <Skeleton variant="rectangular" height={200} animation="wave" />
                <Divider sx={{ my: 2 }} />
                <Skeleton variant="rectangular" height={200} animation="wave" />
                <Divider sx={{ my: 2 }} />
                <Skeleton variant="rectangular" height={200} animation="wave" />
            </>
        );
    }

    if (isError) {
        return <div>{error.message}</div>;
    }

    return (
        <div>
            {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                    {group.map((post) => (
                        <PostEl key={post.id} post={post} />
                    ))}
                </React.Fragment>
            ))}
            <div ref={ref}>
                {isFetchingNextPage && (
                    <Stack
                        sx={{ width: '100%', color: 'grey.500' }}
                        spacing={2}
                    >
                        <LinearProgress color="secondary" />
                    </Stack>
                )}
                {!hasNextPage && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            my: 2,
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            No more posts to load
                        </Typography>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default Loading;
