import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

import { LayoutContext } from '@/context/LayoutContext';
import { AuthContext } from '@/context/AuthContext';
import { Toolbar, Typography } from '@mui/material';

import { sidebarLinks1 } from '@/Constants';
import { useTheme } from '@emotion/react';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 240;

function SideBar() {
    const { mobileOpen, handleDrawerClose, handleDrawerTransitionEnd } =
        React.useContext(LayoutContext);
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    const drawer = (
        <div>
            <Divider sx={{ display: { lg: 'block', xs: 'none' } }} />
            <Toolbar sx={{ display: { lg: 'none', xs: 'block' } }} />
            <List>
                <Typography variant="h6" sx={{ ml: 2 }}>
                    Reddit Clone By <br /> FireBird
                </Typography>
                <Divider sx={{ mx: 2, my: 1 }} />
                {sidebarLinks1.map((link) => (
                    <ListItem key={link.title} disablePadding>
                        <ListItemButton
                            sx={{
                                color:
                                    pathname === link.url
                                        ? theme.palette.secondary.main
                                        : theme.palette.typography.color,
                            }}
                            selected={pathname === link.url}
                            onClick={() => {
                                router.push(link.url);
                                handleDrawerClose();
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color:
                                        pathname === link.url
                                            ? theme.palette.secondary.main
                                            : theme.palette.typography.color,
                                }}
                            >
                                {<link.icon />}
                            </ListItemIcon>
                            <ListItemText primary={link.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            color:
                                pathname === '/get-premium'
                                    ? theme.palette.secondary.main
                                    : theme.palette.typography.color,
                        }}
                        selected={pathname === '/get-premium'}
                        onClick={() => {
                            router.push('/get-premium');
                            handleDrawerClose();
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color:
                                    pathname === '/get-premium'
                                        ? theme.palette.secondary.main
                                        : theme.palette.typography.color,
                            }}
                        >
                            <SecurityOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Get Premium'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { lg: 'none', md: 'block' },
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: theme.palette.primary.main,
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { lg: 'block', xs: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 250,
                        height: 'calc(100vh - 64px)', // subtract AppBar's height
                        position: 'absolute',
                        left: 0,
                        top: 0, // height of AppBar
                        backgroundColor: theme.palette.primary.main,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default SideBar;
