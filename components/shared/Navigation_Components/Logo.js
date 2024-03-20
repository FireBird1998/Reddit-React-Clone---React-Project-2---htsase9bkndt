import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import redditLogo from '@/public/assets/Reddit_Icon_FullColor.svg'
import redditLogoWordmark from '@/public/assets/Reddit_Logo_Wordmark_OrangeRed.svg'
import { useRouter } from 'next/navigation';
const Logo = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('lg'));
    const router = useRouter();
    const handleLogoClick = () => {
        router.push('/');
    }


    return (
        <div
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
        >
            {isSmall ? (
                <Image
                src={redditLogo}// replace with your logo path
                alt="Logo"
                width={35}
                height={35}
            />
            ) : (
                <>
                <Image
                    src={redditLogo}// replace with your logo path
                    alt="Logo"
                    width={30}
                    height={30}
                />
                {` `}
                <Image
                    src={redditLogoWordmark}// replace with your logo path
                    alt="Logo"
                    width={100}
                    height={30}
                />
                </>
            )}
        </div>
    );
};

export default Logo;
