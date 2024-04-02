'use client';
import * as React from 'react';
import {
    Box,
    Button,
    CardMedia,
    Paper,
    Typography,
    Modal,
    Divider,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    useMediaQuery,
} from '@mui/material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useRouter } from 'next/navigation';
import { useTheme } from '@emotion/react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '@/utility/axiosConfig';
import SnackbarEL from '../shared/Notification_Components/SnachBarEL';

const CreateCommunitySideBar = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const queryClient = useQueryClient();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = React.useState(false);
    const [charCount, setCharCount] = React.useState(0);
    const [communityName, setCommunityName] = React.useState('');
    const [communityDescription, setCommunityDescription] = React.useState('');
    const [message, setMessage] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleInputChange = (event) => {
        setCharCount(event.target.value.length);
        setCommunityName(event.target.value);
    };

    const mutation = useMutation(
        ['createCommunity'],
        (data) => {
            const formData = new FormData();
            formData.append('name', data.title);
            formData.append('description', data.description);

            return axios.post('/reddit/channel/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        {
            onSuccess: (data) => {
                // Handle success
                setMessage('Community created successfully');
                setCommunityName('');
                setCommunityDescription('');
                handleClose();
                queryClient.invalidateQueries('popularCommunities');
                router.push(`/r/${data.data.data._id}`);
            },
            onError: (error) => {
                // Handle error
                setMessage('Error creating community');
                if (
                    error.response.data.message.includes('Duplicate field value')
                ) {
                    setMessage('Community name already exists');
                }
            },
            onSettled: (data, error) => {
                // Handle settle (either success or error)
                console.log('Settled:', data, error);
            },
        },
    );

    const handleCreateCommunity = async () => {
        if (communityName.length < 3) {
            setMessage('Community name must be at least 3 characters');
            return;
        }
        const newCommunity = {
            title: communityName,
            description: communityDescription,
        };
        mutation.mutate(newCommunity);
    };

    return (
        <Paper
            sx={{
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '10px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: {
                    xs: 'none',
                    sm: 'none',
                    md: 'flex',
                    lg: 'flex',
                },
            }}
        >
            <CardMedia
                component="img"
                image="https://source.unsplash.com/collection/1065976/800x600"
                alt="Create Community background"
                sx={{
                    width: '100%',
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: '10px',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    p: '10px',
                }}
            >
                <Box>
                    <GroupOutlinedIcon sx={{ fontSize: '2rem' }} />
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Create a Community
                    </Typography>
                    <Typography>
                        Start your own subreddit and build a community
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    px: '10px',
                    py: '10px',
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                        backgroundColor: 'blue',
                        color: 'white',
                        marginTop: '10px',
                        borderRadius: '50px',
                        width: '100%',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: 'blue',
                        },
                    }}
                >
                    Create Community
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    keepMounted
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                            fontWeight={500}
                        >
                            Create a Community
                        </Typography>
                        <Divider />
                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            variant="h6"
                            fontWeight={400}
                        >
                            Name
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Community names including capitalization cannot be
                            changed.
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label="r/"
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            autoFocus
                            value={communityName}
                            inputProps={{ maxLength: 21 }}
                            onChange={handleInputChange}
                            sx={{
                                mt: 2,
                                '& label.Mui-focused': {
                                    color: theme.palette.secondary.main,
                                    borderColor: theme.palette.secondary.main,
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor:
                                            theme.palette.secondary.main,
                                    },
                            }}
                        />
                        <TextField
                            id="community description "
                            label="Description (optional)"
                            multiline
                            maxRows={4}
                            value={communityDescription}
                            autoComplete="off"
                            fullWidth
                            onChange={(e) =>
                                setCommunityDescription(e.target.value)
                            }
                            sx={{
                                mt: 2,
                                '& label.Mui-focused': {
                                    color: theme.palette.secondary.main,
                                    borderColor: theme.palette.secondary.main,
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor:
                                            theme.palette.secondary.main,
                                    },
                            }}
                        />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            {21 - charCount} characters remaining
                        </Typography>
                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            variant="h6"
                            fontWeight={400}
                        >
                            Community type
                        </Typography>
                        <RadioGroup
                            defaultValue="public"
                            aria-label="community type"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="public"
                                control={<Radio color="colorblue" />}
                                label={
                                    <Box>
                                        <Typography variant="span">
                                            Public{` `}
                                        </Typography>
                                        <Typography
                                            variant="span"
                                            color="text.secondary"
                                            fontSize={12}
                                        >
                                            Anyone can view, post, and comment
                                            to this community
                                        </Typography>
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="private"
                                control={<Radio color="colorblue" />}
                                label={
                                    <Box>
                                        <Typography variant="span">
                                            Private{` `}
                                        </Typography>
                                        <Typography
                                            variant="span"
                                            color="text.secondary"
                                            fontSize={12}
                                        >
                                            Anyone can view this community, only
                                            approved users can post
                                        </Typography>
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="restricted"
                                control={<Radio color="colorblue" />}
                                label={
                                    <Box>
                                        <Typography variant="span">
                                            Restricted{` `}
                                        </Typography>
                                        <Typography
                                            variant="span"
                                            color="text.secondary"
                                            fontSize={12}
                                        >
                                            Only approved users can view and
                                            submit to this community
                                        </Typography>
                                    </Box>
                                }
                            />
                        </RadioGroup>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                flexDirection: isMobile ? 'column' : 'row',
                                mt: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    marginTop: '10px',
                                    borderRadius: '50px',
                                    width: isMobile ? '100%' : '50%',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: 'blue',
                                    },
                                }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    marginTop: '10px',
                                    borderRadius: '50px',
                                    width: isMobile ? '100%' : '50%',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: 'blue',
                                    },
                                }}
                                onClick={handleCreateCommunity}
                            >
                                Create Community
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
            <SnackbarEL message={message} setMessage={setMessage} />
        </Paper>
    );
};

export default CreateCommunitySideBar;
