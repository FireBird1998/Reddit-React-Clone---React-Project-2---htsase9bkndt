'use client';
import { useEffect, useContext } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { getPosts, getPostsFilter, getPostsSort } from '@/app/action';
import { FilterBarContext } from '@/context/FilterBarContex';
import PostEl from '@/components/shared/Post_Components/PostEl';
import { useInfiniteQuery } from 'react-query';
import {
    Divider,
    Skeleton,
    CircularProgress,
    Box,
    LinearProgress,
    Typography,
    Stack,
} from '@mui/material';

const LoadMore = () => {
    const { activeButton } = useContext(FilterBarContext);
    const fetchPosts = ({ pageParam = 1 }) => {
        switch (activeButton) {
            case 'Best':
                return getPostsFilter(
                    pageParam,
                    10,
                    '{"$expr":{"$gt":["$likeCount","$dislikeCount"]}}',
                );
            case 'Hot':
                return getPostsFilter(
                    pageParam,
                    10,
                    '{"$expr":{"$eq":["$likeCount","$dislikeCount"]}}',
                );
            case 'New':
                return getPostsSort(pageParam, 10, { createdAt: -1 });
            case 'Top':
                return getPostsSort(pageParam, 10, { likeCount: -1 });
            default:
                return getPosts(pageParam);
        }
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery(['posts', activeButton], fetchPosts, {
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

    useEffect(() => {
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

    return (
        <div>
            {data &&
                data?.pages?.flatMap((pageData) =>
                    pageData?.map((post) => (
                        <PostEl key={post._id} post={post} />
                    )),
                )}
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

export default LoadMore;
