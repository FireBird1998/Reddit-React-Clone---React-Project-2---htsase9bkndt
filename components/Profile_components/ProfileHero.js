'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useQuery } from 'react-query';
import { useTheme } from '@emotion/react';
import {
    useMediaQuery,
    Box,
    Card,
    CardMedia,
    Paper,
    Avatar,
    CardContent,
    Typography,
} from '@mui/material';
import SnackbarEL from '../shared/Notification_Components/SnachBarEL';

const ProfileHero = () => {
    const { authState } = useContext(AuthContext);
    const { data, isLoading, isError, error } = useQuery(
        'userData',
        () => authState.userInfo,
    );
    
    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box>
            <Banner data={authState.userInfo} />
        </Box>
    );
};

const Banner = ({ data }) => {
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
                            left: '50px',
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
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                {data.email}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
            <SnackbarEL message={message} setMessage={setMessage} />
        </Paper>
    );
};

export default ProfileHero;
