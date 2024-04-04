import {
    Box,
    CardMedia,
    Paper,
    CardContent,
    Typography,
    Fab,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { Edit } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';


const ProfileHero = ({ user }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const { isUserAuthenticated, authState } = useContext(AuthContext);

    return (
        <Paper
            sx={{
                backgroundColor: 'primary.main',
                padding: 2,
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'flex-start',
                position: 'relative',
            }}>
                <CardMedia
                    component="img"
                    height="180"
                    image={user.data.profileImage ? user.data.profileImage : 'https://source.unsplash.com/2000x2000/?nature'}
                    alt="green iguana"
                    sx={{
                        width: 160,
                        objectFit: 'cover',
                        borderRadius: '25px',
                    }}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {user?.data?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.data?.email}
                    </Typography>
                </CardContent>
                {authState.userInfo?._id === user.data?._id && <Fab
                    size="small"
                    color="secondary"
                    aria-label="edit Profile"
                    elevation={10}
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                    }}
                    onClick={() => router.push(`/profile/settings/${user.data._id}`)}
                >
                    <Edit />
                </Fab>}
                
            </Box>
        </Paper>
    );
};

export default ProfileHero;
