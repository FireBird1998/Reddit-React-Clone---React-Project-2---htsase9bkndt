// React related imports
import * as React from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@emotion/react';

// Material UI imports
import {
    Box,
    Tab,
    Divider,
    Skeleton,
    Stack,
    Typography,
    LinearProgress,
    Slide,
} from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab';

// Other imports
import axios from '@/utility/axiosConfig';
import SelectorEl from '@/components/Profile_components/SelectorEl';
import PostEl from '@/components/shared/Post_Components/PostEl';

const fetchUserData = async (username) => {
    try {
        const res = await axios.get(
            `/reddit/post?filter={"author.name":"${username}"}`,
        );
        return res.data;
    } catch (err) {
        throw new Error('Failed to fetch user data');
    }
};

const UserBody = ({ user }) => {
    const [value, setValue] = React.useState('1');
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [prevValue, setPrevValue] = React.useState(value);

    React.useEffect(() => {
        setPrevValue(value);
    }, [value]);

    const direction = prevValue < value ? 'left' : 'right';

    const tabStyle = {
        fontSize: '0.75rem',
        borderRadius: '25px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
        '&.Mui-selected': {
            color: theme.palette.secondary.main,
            textShadow: `0 0 10px ${theme.palette.secondary.main}, 0 0 20px ${theme.palette.secondary.main}, 0 0 30px ${theme.palette.secondary.main}, 0 0 40px ${theme.palette.secondary.main}`,
        },
    };

    return (
        <Box
            className="tab-container"
            sx={{
                width: '100%',
                typography: 'body1',
                mt: 1,
                overflow: 'hidden',
            }}
        >
            {user && (
                <TabContext value={value}>
                    <Box
                        sx={{
                            minWidth: '100%',
                        }}
                    >
                        <TabList
                            onChange={handleChange}
                            aria-label="Awesome tabs"
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                },
                            }}
                        >
                            <Tab label="Overview" value="1" sx={tabStyle} />
                            <Tab label="Posts" value="2" sx={tabStyle} />
                        </TabList>
                    </Box>
                    <Slide
                        direction={direction}
                        in={value === '1'}
                        mountOnEnter
                        unmountOnExit
                    >
                        <TabPanel value="1" sx={{ m: 0, p: 0 }}>
                            <OverView2 user={user} />
                        </TabPanel>
                    </Slide>
                    <Slide
                        direction={direction}
                        in={value === '2'}
                        mountOnEnter
                        unmountOnExit
                    >
                        <TabPanel value="2">2</TabPanel>
                    </Slide>
                </TabContext>
            )}
        </Box>
    );
};

const OverView2 = ({ user }) => {
    const [filter, setFilter] = React.useState('new');
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    justifyContent: 'start',
                    gap: 2,
                }}
            >
                <SelectorEl filter={filter} setFilter={setFilter} />
            </Box>
            <Divider sx={{ my: 1 }} />
            <Loading user={user} filter={filter} />
        </Box>
    );
};


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

const Loading = ({ filter, user }) => {
    const [userName, setUserName] = React.useState(
        user && user.data && user.data.name ? user.data.name : '',
    );
    React.useEffect(() => {
        setUserName(user.data.name);
    }, [user]);

    const fetchPosts = ({ pageParam }) => {
        switch (filter) {
            case 'hot':
                return getPostsByFilterAndSort({
                    pageParam,
                    filter: {
                        $expr: { $eq: ['$likeCount', '$dislikeCount'] },
                        'author.name': `${userName}`,
                    },
                    sort: { createdAt: -1 },
                });
            case 'new':
                return getPostsByFilterAndSort({
                    pageParam,
                    filter: { 'author.name': `${userName}` },
                    sort: { createdAt: -1 },
                });
            case 'top':
                return getPostsByFilterAndSort({
                    pageParam,
                    filter: { 'author.name': `${userName}` },
                    sort: { likeCount: -1 },
                });
        }
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery(
        ['postsfromUser', filter, userName],
        fetchPosts,
        {
            getNextPageParam: (lastPage, pages) => {
                // Check if the last page is empty. If it is, return undefined.
                if (lastPage?.length === 0) {
                    return undefined;
                }
                return pages.length + 1;
            },
        },
    );

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
                        <PostEl key={post._id} post={post} />
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

export default UserBody;
