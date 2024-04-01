'use client';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SignpostIcon from '@mui/icons-material/Signpost';
import RedditIcon from '@mui/icons-material/Reddit';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, Typography, useMediaQuery } from '@mui/material';

import { usePathname, useRouter } from 'next/navigation';

import { sidebarLinks1, otherLinks } from '@/Constants';

import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state/hooks';

const CustomButton = ({ popupState, children, ...otherProps }) => {
    return (
        <Button
            variant="contained"
            {...bindTrigger(popupState)}
            {...otherProps}
            sx={{
                width: '80%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                py: 1,
                borderRadius: '10px',
                mx: 1,
            }}
        >
            {children}
            <ArrowDropDownIcon />
        </Button>
    );
};
const AuthNavDropDown = () => {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoMenu',
    });
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:1100px)');
    const [icon, setIcon] = useState(null);
    const [name, setName] = useState('');
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        const postRegex = /^\/r\/post\//;
        const dynamicIdRegex = /^\/r\/[a-f0-9]{24}$/;
        const profileRegex = /^\/profile\/[a-f0-9]{24}$/;
        const userRegex = /^\/u\/[a-zA-Z0-9]+$/;
        const settingsRegex = /^\/profile\/settings\/[a-f0-9]{24}$/;
        if (pathname === sidebarLinks1[0].url) {
            const Icon1 = sidebarLinks1[0].icon;
            setIcon(<Icon1 />);
            setName(sidebarLinks1[0].title);
        } else if (pathname === sidebarLinks1[1].url) {
            const Icon2 = sidebarLinks1[1].icon;
            setIcon(<Icon2 />);
            setName(sidebarLinks1[1].title);
        } else if (pathname === otherLinks[0].url) {
            const Icon3 = otherLinks[0].icon;
            setIcon(<Icon3 />);
            setName(otherLinks[0].title);
        } else if (dynamicIdRegex.test(pathname)) {
            setIcon(<SignpostIcon />);
            setName('/r/community/...');
        } else if (postRegex.test(pathname)) {
            setIcon(<SignpostIcon />);
            setName('/r/post/...');
        } else if (profileRegex.test(pathname)) {
            setIcon(<RedditIcon />);
            setName(`${authState.userInfo.name}'s Profile`);
        } else if (userRegex.test(pathname)) {
            setIcon(<RedditIcon />);
            setName('User Profile');
        } else if (settingsRegex.test(pathname)) {
            setIcon(<RedditIcon />);
            setName('User Settings');
        } else {
            setIcon(null);
            setName('Other');
        }
    }, [pathname]);

    const handleMenuItemClick = (link) => {
        popupState.close();
        router.push(link.url);
    };

    return (
        <>
            <CustomButton popupState={popupState}>
                {icon}
                {isMobile ? '' : name}
            </CustomButton>
            <Menu
                {...bindMenu(popupState)}
                MenuListProps={{
                    sx: {
                        width: '250px',
                    },
                }}
            >
                <Typography
                    variant="p"
                    sx={{ ml: 2, pb: 2, textDecoration: 'underline' }}
                >
                    Feeds
                </Typography>
                {sidebarLinks1.map((link) => {
                    return (
                        <MenuItem
                            key={link.title}
                            onClick={() => handleMenuItemClick(link)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                width: '100%',
                                gap: '10px',
                            }}
                        >
                            <link.icon />
                            {link.title}
                        </MenuItem>
                    );
                })}
                <Divider />

                <Typography
                    variant="p"
                    sx={{ ml: 2, pb: 2, textDecoration: 'underline' }}
                >
                    User Details
                </Typography>
                <MenuItem
                    onClick={() => {
                        popupState.close();
                        router.push(`/profile/${authState.userInfo._id}`);
                    }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        width: '100%',
                        gap: '10px',
                    }}
                >
                    <RedditIcon />
                    {authState.userInfo.name.split(' ')[0]}'s Profile
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        popupState.close();
                        router.push(
                            `/profile/settings/${authState.userInfo._id}`,
                        );
                    }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        width: '100%',
                        gap: '10px',
                    }}
                >
                    <SettingsIcon />
                    Profile Settings
                </MenuItem>

                <Divider />
                <Typography
                    variant="p"
                    sx={{ ml: 2, pb: 2, textDecoration: 'underline' }}
                >
                    Others
                </Typography>
                {otherLinks.map((link) => {
                    return (
                        <MenuItem
                            key={link.title}
                            onClick={() => handleMenuItemClick(link)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                width: '100%',
                                gap: '10px',
                            }}
                        >
                            <link.icon />
                            {link.title}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};

export default AuthNavDropDown;
