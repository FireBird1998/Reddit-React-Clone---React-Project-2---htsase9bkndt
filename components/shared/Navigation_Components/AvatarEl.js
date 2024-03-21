import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileIcon from '@/public/assets/icons8-reddit-94.png';
import Gif from '@/public/assets/icons8-reddit.gif'
import Image from 'next/image';

const AvatarEl = () => {
    const { isUserAuthenticated, authState } = useContext(AuthContext);
    const matches = useMediaQuery('(max-width:600px)');

    return !isUserAuthenticated() ? (
        <Avatar
            sx={{
                bgcolor: deepOrange[500],
                width: matches ? 20 : 30,
                height: matches ? 20 : 30,
            }}
        >
            <Image
                src={Gif}
                alt="Profile Icon"
                width={matches ? 20 : 30}
                height={matches ? 20 : 30}
            />
        </Avatar>
    ) : (
        <Avatar
            sx={{
                bgcolor: deepOrange[500],
                width: matches ? 20 : 30,
                height: matches ? 20 : 30,
            }}
        >
            <Image
                src={ProfileIcon}
                alt="Profile Icon"
                width={matches ? 20 : 30}
                height={matches ? 20 : 30}
            />
        </Avatar>
    );
};

export default AvatarEl;
