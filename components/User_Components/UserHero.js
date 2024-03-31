import { Box, CardMedia, Paper, CardContent, Typography } from '@mui/material';

const UserHero = ({user}) => {
    return (
        <Paper
            sx={{
                backgroundColor: 'primary.main',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                <CardMedia
                    component="img"
                    height="180"
                    image={
                        user.data.profileImage
                            ? user.data.profileImage
                            : 'https://source.unsplash.com/2000x2000/?nature'
                    }
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
            </Box>
        </Paper>
    );
};

export default UserHero;
