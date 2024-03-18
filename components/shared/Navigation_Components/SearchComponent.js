'use client';
import React, { useContext, useState, useEffect } from 'react';
import {
    Modal,
    Typography,
    InputBase,
    IconButton,
    Button,
    Box,
    useMediaQuery,
    Divider,
    Skeleton,
    Stack,
    Paper,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { ModalContext } from '@/context/SearchModalContext';
import axios from '@/utility/axiosConfig';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { throttle } from 'lodash';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 5,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

const SearchComponent = () => {
    const { isOpen, toggleModal } = useContext(ModalContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isWeb = useMediaQuery(theme.breakpoints.up('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const modalStyle = {
        position: 'fixed',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : isTablet ? '80%' : isWeb ? '60%' : '50%',
        height: '90%', // adjust as needed
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const fetchPosts = async ({ queryKey }) => {
        const [, key, searchTerm] = queryKey;
        console.log('Fetching data for:', key, searchTerm);
        const { data } = await axios.get(
            `/reddit/post?search={"${key}":"${searchTerm}"}`,
        );
        return data;
    };

    const {
        data: searchResByTitle,
        isLoading: isLoadingByTitle,
        isError: isErrorByTitle,
    } = useQuery(['search', 'title', searchTerm], fetchPosts, {
        enabled: !!searchTerm,
        onSuccess: (data) => {
            console.log('Data fetched successfully by title!', data);
        },
        onError: (error) => {
            console.error('Error fetching data by title:', error);
        },
    });

    const {
        data: searchResByAuthor,
        isLoading: isLoadingByAuthor,
        isError: isErrorByAuthor,
    } = useQuery(['search', 'author', searchTerm], fetchPosts, {
        enabled: !!searchTerm,
        onSuccess: (data) => {
            console.log('Data fetched successfully by author!', data);
        },
        onError: (error) => {
            console.error('Error fetching data by author:', error);
        },
    });

    const {
        data: searchResByContent,
        isLoading: isLoadingByContent,
        isError: isErrorByContent,
    } = useQuery(['search', 'content', searchTerm], fetchPosts, {
        enabled: !!searchTerm,
        onSuccess: (data) => {
            console.log('Data fetched successfully by content!', data);
        },
        onError: (error) => {
            console.error('Error fetching data by content:', error);
        },
    });

    const throttledHandleSearch = throttle((value) => {
        setSearchTerm(value);
    }, 1000); // delay in ms

    const handleSearch = (event) => {
        throttledHandleSearch(event.target.value);
    };
    return (
        <Modal
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            keepMounted
        >
            <Box sx={modalStyle}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search Post…"
                        inputProps={{ 'aria-label': 'searchModal' }}
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => handleSearch(e)}
                    />
                </Search>
                <Box
                    sx={{
                        height: '90%',
                        overflow: 'auto',
                        mt: 2,
                        '&::-webkit-scrollbar': {
                            width: '10px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '20px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                        },
                    }}
                >
                    <SearchResbyTitle
                        searchResByTitle={searchResByTitle}
                        isLoadingByTitle={isLoadingByTitle}
                        isErrorByTitle={isErrorByTitle}
                    />

                    <SearchResbyContent
                        searchResByContent={searchResByContent}
                        isLoadingByContent={isLoadingByContent}
                        isErrorByContent={isErrorByContent}
                    />

                    <SearchResbyAuthor
                        searchResByAuthor={searchResByAuthor}
                        isLoadingByAuthor={isLoadingByAuthor}
                        isErrorByAuthor={isErrorByAuthor}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

const SearchResbyTitle = ({
    searchResByTitle,
    isLoadingByTitle,
    isErrorByTitle,
}) => {
    if (isLoadingByTitle) {
        return (
            <Box
                sx={{
                    minHeight: '50px',
                    mt: 2,
                }}
            >
                <Typography variant="p">Search Results by Title</Typography>
                <Divider />
                <Stack spacing={1}>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </Stack>
            </Box>
        );
    }

    if (isErrorByTitle) {
        return (
            <Box
                sx={{
                    minHeight: '50px',
                    mt: 2,
                }}
            >
                <Typography variant="p">Search Results by Title</Typography>
                <Divider />
                <Typography variant="p">
                    Error fetching data by title!
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100px',
                mt: 2,
            }}
        >
            <Typography variant="p">Search Results by Title</Typography>
            <Divider />
            {searchResByTitle &&
                searchResByTitle.data.map((post) => (
                    <SearchCardByTitle key={post._id} post={post} />
                ))}
        </Box>
    );
};

const SearchResbyContent = ({
    searchResByContent,
    isLoadingByContent,
    isErrorByContent,
}) => {
    if (isLoadingByContent) {
        return (
            <Box
                sx={{
                    minHeight: '50px',
                    mt: 2,
                }}
            >
                <Typography variant="p">Search Results by Content</Typography>
                <Divider />
                <Stack spacing={1}>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </Stack>
            </Box>
        );
    }

    if (isErrorByContent) {
        return (
            <Box
                sx={{
                    minHeight: '50px',
                    mt: 2,
                }}
            >
                <Typography variant="p">Search Results by Content</Typography>
                <Divider />
                <Typography variant="p">
                    Error fetching data by content!
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100px',
                mt: 2,
            }}
        >
            <Typography variant="p">Search Results by Contenet</Typography>
            <Divider />
            {searchResByContent &&
                searchResByContent.data.map((post) => (
                    <SearchCardByContent key={post._id} post={post} />
                ))}
        </Box>
    );
};

const SearchResbyAuthor = ({
    searchResByAuthor,
    isLoadingByAuthor,
    isErrorByAuthor,
}) => {
    if (isLoadingByAuthor) {
        return (
            <Box
                sx={{
                    minHeight: '50px',
                    mt: 2,
                }}
            >
                <Typography variant="p">Search Results by Author</Typography>
                <Divider />
                <Stack spacing={1}>
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" animation="wave" />
                </Stack>
            </Box>
        );
    }

    if (isErrorByAuthor) {
        return (
            <Box
                sx={{
                    minHeight: '50px',
                    mt: 2,
                }}
            >
                <Typography variant="p">Search Results by Author</Typography>
                <Divider />
                <Typography variant="p">
                    Error fetching data by author!
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100px',
                mt: 2,
            }}
        >
            <Typography variant="p">Search Results by Author</Typography>
            <Divider />
            {searchResByAuthor &&
                searchResByAuthor.data.map((post) => (
                    <SearchCardByContent key={post._id} post={post} />
                ))}
        </Box>
    );
};

const SearchPostELement = ({ post }) => {
    return (
        <Box>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="p">{post.content}</Typography>
        </Box>
    );
};

const SearchCardByTitle = ({ post }) => {
    const theme = useTheme();
    const router = useRouter();
    const { toggleModal } = useContext(ModalContext);
    return (
        <Box
            sx={{
                mt: 2,
                mr: 2,
            }}
        >
            <Card variant="outlined" elevation={4}>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {post.title}
                    </Typography>
                    <Typography
                        variant="p"
                        sx={{
                            textAlign: 'right',
                            width: '100%',
                        }}
                    >
                        -{post.author.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => {
                            toggleModal();
                            router.push(`/r/post/${post._id}`);
                        }}
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.5,
                            ), // Use semi-transparent primary color from theme
                            '&:hover': {
                                backgroundColor: alpha(
                                    theme.palette.secondary.dark,
                                    0.5,
                                ), // Use semi-transparent dark primary color on hover
                            },
                            color: theme.palette.text.primary,
                        }}
                    >
                        Read More
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};
const SearchCardByContent = ({ post }) => {
    const theme = useTheme();
    const router = useRouter();
    const { toggleModal } = useContext(ModalContext);
    return (
        <Box
            sx={{
                mt: 2,
                mr: 2,
            }}
        >
            <Card variant="outlined" elevation={4}>
                <CardContent>
                    <Typography
                        variant="p"
                        sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {post.content}
                    </Typography>
                    <Typography
                        variant="p"
                        sx={{
                            textAlign: 'right',
                            width: '100%',
                        }}
                    >
                        -{post.author.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => {
                            toggleModal();
                            router.push(`/r/post/${post._id}`);
                        }}
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.5,
                            ), // Use semi-transparent primary color from theme
                            '&:hover': {
                                backgroundColor: alpha(
                                    theme.palette.secondary.dark,
                                    0.5,
                                ), // Use semi-transparent dark primary color on hover
                            },
                            color: theme.palette.text.primary,
                        }}
                    >
                        Read More
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default SearchComponent;
