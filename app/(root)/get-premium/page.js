'use client';
import {
    CardMedia,
    Card,
    Grid,
    Typography,
    Box,
    useMediaQuery,
    Button,
    CardContent,
} from '@mui/material';
import React, {useContext} from 'react';
import { useTheme } from '@emotion/react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const page = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <PremiumHero />
            <PremiumFeatures />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    minWidth: isMobile ? '100%' : '60%',
                    mt: '20px',
                }}
            >
                <ButtonSetBuy />
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    sx={{ mt: '20px', fontSize: '0.7rem' }}
                >
                    Subscriptions automatically renew
                </Typography>
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    sx={{ mt: '10px', fontSize: '0.7rem' }}
                >
                    * Custom app icons are only available through a paid Reddit
                    Premium subscription.
                </Typography>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#0C3744',
                    minHeight: '30vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: '30px',
                    borderRadius: '20px',
                }}
            >
                <FooterSection />
            </Box>
        </Box>
    );
};

const PremiumHero = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Grid
            container
            sx={{
                backgroundImage: 'url(/assets/premiumHero.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: isMobile ? 'center' : 'left',
                minHeight: '75vh',
                borderRadius: '10px',
                width: '100%',
            }}
            spacing={2}
            justifyContent={!isMobile ? 'center' : 'flex-start'}
            alignItems={!isMobile ? 'center' : 'flex-start'}
        >
            <Grid item xs={12} sm={6}>
                <Typography variant="h1">
                    <CardMedia
                        component="img"
                        image="/assets/reddit_premium_landing.png"
                        alt="Reddit Premium"
                        height={isMobile ? '100%' : 'auto'}
                    />
                </Typography>
                <Typography variant="h6">
                    Help support Reddit and get VIP treatment and exclusive
                    access.
                </Typography>
                <ButtonSetBuy />
            </Grid>
            <Grid item xs={0} lg={6}></Grid>
        </Grid>
    );
};

const PremiumFeatures = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { isUserAuthenticated } = useContext(AuthContext);
    return (
        <Box
            sx={{
                width: isUserAuthenticated() ? '80%' : '100%',
            }}
        >
            <Typography
                variant="h3"
                sx={{ mt: '20px', textAlign: 'center', mb: 2 }}
                fontWeight={500}
            >
                Join Reddit Premium Today
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                    <CardAd
                        img={'/assets/premium-ad-free.png'}
                        title={'Ad-free Browsing'}
                        dec={'Enjoy rendditing without interruptions from ads'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CardAd
                        img={'/assets/premium-avatars.png'}
                        title={'Exclusive Avatar Gear'}
                        dec={
                            'Outfit your avatar with the best gear and accessories'
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CardAd
                        img={'/assets/premium-lounge.png'}
                        title={'Members Lounge'}
                        dec={'Discover all the illuminati secrets in r/lounge'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <CardAd
                        img={'/assets/premium-app-icons.png'}
                        title={'Custom App Icons*'}
                        dec={
                            'Change your app icon to something more your style'
                        }
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const CardAd = ({ img, title, dec }) => {
    

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '30px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                height: '100%',

            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <CardMedia
                    component="img"
                    image={img}
                    height={60}
                    sx={{ width: 60 }}
                />
                <Typography variant="p">{title}</Typography>
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    sx={{ textAlign: 'center' }}
                >
                    {dec}
                </Typography>
            </CardContent>
        </Card>
    );
};

const ButtonSetBuy = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '10px',
                mt: '20px',
                width: '100%',
            }}
        >
            <Button
                sx={{
                    color: 'white',
                    borderRadius: '50px',
                    border: '1px solid white',
                    width: '100%',
                    textTransform: 'none',
                }}
                onClick={() => router.push('/comming-Soon')}
            >
                $5.99/Month
            </Button>
            <Button
                sx={{
                    color: 'white',
                    borderRadius: '50px',
                    border: '1px solid #FF4500',
                    width: '100%',
                    backgroundColor: '#FF4500',
                    textTransform: 'none',
                }}
                onClick={() => router.push('/comming-Soon')}
            >
                $49.99/Year
                <span
                    style={{
                        color: '#FF4500',
                        fontSize: '0.8em',
                        backgroundColor: 'white',
                        borderRadius: '50px',
                        padding: '2px 5px',
                        marginLeft: '10px',
                    }}
                >
                    Save 30%
                </span>
            </Button>
        </Box>
    );
};

const FooterSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '100%' : '60%',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body1">About</Typography>
                    <Typography variant="body1">Blog</Typography>
                    <Typography variant="body1">Press</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body1">Careers</Typography>
                    <Typography variant="body1">Advertise</Typography>
                    <Typography variant="body1">Contact</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body1">Reddit Premium</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body1">FaceBook</Typography>
                    <Typography variant="body1">Twitter</Typography>
                    <Typography variant="body1">Instagram</Typography>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    gap: '10px',
                }}
            >
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    sx={{
                        mt: '20px',
                        fontSize: '0.7rem',
                        textDecoration: 'underline',
                    }}
                >
                    Content Policy
                </Typography>
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    sx={{
                        mt: '20px',
                        fontSize: '0.7rem',
                        textDecoration: 'underline',
                    }}
                >
                    Privacy Policy
                </Typography>
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    sx={{
                        mt: '20px',
                        fontSize: '0.7rem',
                        textDecoration: 'underline',
                    }}
                >
                    User Agreement
                </Typography>
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    sx={{
                        mt: '20px',
                        fontSize: '0.7rem',
                        textDecoration: 'underline',
                    }}
                >
                    Mod Policy
                </Typography>
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    sx={{ mt: '20px', fontSize: '0.7rem' }}
                >
                    Reddit Inc © 2021. All rights reserved
                </Typography>
            </Box>
        </Box>
    );
};

export default page;
