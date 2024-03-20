'use client';
import {useState} from 'react';
import { useQuery } from 'react-query';
import {
    Box,
    Skeleton,
    Card,
    CardMedia,
    Paper,
    Avatar,
    useMediaQuery,
    CardContent,
    Typography,
    Button,
} from '@mui/material';
import { useTheme } from '@emotion/react';

import axios from 'axios';
import SnackbarEL from '../shared/Notification_Components/SnachBarEL';
const CommunityHero = ({ communityId, fn }) => {
    const { data, isLoading, isError, error } = useQuery('communityData', () =>
        fn(communityId),
    );

    if (isLoading) {
        return (
            <Box>
                <Skeleton variant="rectangular" width="100%" height="300px" />
            </Box>
        );
    }
    return (
        <Box>
            <Banner data={data.data} />
        </Box>
    );
};

const Banner = ({data}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [message, setMessage] = useState('');

    const avatarSize = isMobile ? '50px' : isTablet ? '75px' : '100px';
    const avatarPosition = isMobile ? '-10px' : isTablet ? '-20px' : '-25px';
    const imageHeight = isMobile ? '150' : isTablet ? '200' : '250';

    const image = `https://source.unsplash.com/2000x${imageHeight}/`;

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'relative',
            }}
        >
            <Card>
                {image && (
                    <CardMedia
                        component="img"
                        height={imageHeight}
                        image={image}
                        alt="Community Hero"
                    />
                )}
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: avatarSize,
                        paddingTop: avatarPosition,
                    }}
                >
                    <Avatar
                        sx={{
                            position: 'absolute',
                            top: avatarPosition,
                            left: "50px",
                            width: avatarSize,
                            height: avatarSize,
                            border: '2px solid white',
                            zIndex: 1,
                        }}
                    >
                        {data.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <CardContent
                        sx={{
                            ml: 7,
                            display: 'flex',
                            gap: isMobile ? '1rem' : '3rem',    
                        }}
                    >
                        <Box>
                            <Typography variant="h5" color="textPrimary">
                                {data.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {data.description}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                r/{data.name}
                            </Typography>
                        </Box>
                        <Button 
                            sx={{
                                height: "40px",
                                width: "100px", 
                                borderRadius: "50px",
                                fontWeight: 500,
                                backgroundColor: theme.mode === "light" ? "rgba(0,0,0,.5)" : "white",
                                color: theme.mode === "light" ? "white" : "black",
                                "&:hover": {
                                    backgroundColor: theme.mode === "light" ? "white" : "rgba(0,0,0,.5)",
                                    color: theme.mode === "light" ? "black" : "white",
                                }
                            }}
                            onClick={() => setMessage('Feature Comming soon!!!!')}
                        >
                            join
                        </Button>
                    </CardContent>
                </Box>
            </Card>
            <SnackbarEL message={message} setMessage={setMessage}/>
        </Paper>
    );
};

export default CommunityHero;
