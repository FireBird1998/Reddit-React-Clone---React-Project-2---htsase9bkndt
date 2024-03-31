'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Slide from '@mui/material/Slide';
import { useTheme } from '@emotion/react';
import { Divider } from '@mui/material';
import Account from './Account';
import Profile from './Profile';

const TabComponent = ({user}) => {
    const [value, setValue] = React.useState('1');
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [prevValue, setPrevValue] = React.useState(value);

    React.useEffect(() => {
        setPrevValue(value);
    }, [value]);

    const direction = prevValue < value ? 'left' : 'right';

    const tabStyle = {
        textTransform: 'none', // transforms text to uppercase
        borderRadius: '25px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
        },
        '&.Mui-selected': {
            color: theme.palette.secondary.main,
            textShadow: `0 0 10px ${theme.palette.secondary.main}, 0 0 20px ${theme.palette.secondary.main}, 0 0 30px ${theme.palette.secondary.main}, 0 0 40px ${theme.palette.secondary.main}`,
        },
    };

    return (
        <Box
            className="tab-container"
            sx={{
                width: '100%',
                typography: 'body1',
                mt: 1,
                overflow: 'hidden',
            }}
        >
            <TabContext value={value}>
                <Box
                    sx={{
                        minWidth: '100%',
                    }}
                >
                    <TabList
                        onChange={handleChange}
                        aria-label="Awesome tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                    >
                        <Tab label="Account" value="1" sx={tabStyle} />
                        <Tab label="Profile" value="2" sx={tabStyle} />
                    </TabList>
                    <Divider />
                </Box>
                <Slide
                    direction={direction}
                    in={value === '1'}
                    mountOnEnter
                    unmountOnExit
                >
                    <TabPanel value="1" sx={{ m: 0, p: 0}}>
                        <Account />
                    </TabPanel>
                </Slide>
                <Slide
                    direction={direction}
                    in={value === '2'}
                    mountOnEnter
                    unmountOnExit
                >
                    <TabPanel value="2" sx={{ m: 0, p: 0}}>
                        <Profile />
                    </TabPanel>
                </Slide>
            </TabContext>
        </Box>
    );
};

export default TabComponent;
