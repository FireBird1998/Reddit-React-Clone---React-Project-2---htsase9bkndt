'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Slide from '@mui/material/Slide';
import { useTheme } from '@emotion/react';

import OverView from './OverView';
import Posts from './Posts';
import Comments from './Comments';
import Saved from './Saved';
import UpVoted from './UpVoted';
import DownVoted from './DownVoted';

import { AuthContext } from '@/context/AuthContext';
const TabsMain = ({ user }) => {
    const [value, setValue] = React.useState('1');
    const theme = useTheme();
    const { authState } = React.useContext(AuthContext);
    const [isOnewer, setIsOnewer] = React.useState(false);
    // console.log(user);
    // console.log(authState);

    React.useEffect(() => {
        if (authState?.userInfo?._id === user?.data?._id) {
            setIsOnewer(true);
        }else{
            setIsOnewer(false);
        }
    }, [authState, user]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [prevValue, setPrevValue] = React.useState(value);

    React.useEffect(() => {
        setPrevValue(value);
    }, [value]);

    const direction = prevValue < value ? 'left' : 'right';

    const tabStyle = {
        fontSize: '0.75rem',
        borderRadius: '25px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
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
                        <Tab label="Overview" value="1" sx={tabStyle} />
                        <Tab label="Posts" value="2" sx={tabStyle} />
                        {isOnewer && (
                            <>
                                <Tab label="Comments" value="3" sx={tabStyle} />
                                <Tab label="Saved" value="4" sx={tabStyle} />
                                <Tab label="Upvoted" value="5" sx={tabStyle} />
                                <Tab label="Downvoted" value="6" sx={tabStyle} />
                            </>
                        )}
                    </TabList>
                </Box>
                <Slide
                    direction={direction}
                    in={value === '1'}
                    mountOnEnter
                    unmountOnExit
                >
                    <TabPanel value="1" sx={{ m: 0, p: 0 }}>
                        <OverView user={user} isOnewer={isOnewer} />
                    </TabPanel>
                </Slide>
                <Slide
                    direction={direction}
                    in={value === '2'}
                    mountOnEnter
                    unmountOnExit
                >
                    <TabPanel value="2">
                        <Posts user={user} />
                    </TabPanel>
                </Slide>
                {isOnewer && (
                    <>
                        <Slide
                            direction={direction}
                            in={value === '3'}
                            mountOnEnter
                            unmountOnExit
                        >
                            <TabPanel value="3">
                                <Comments />
                            </TabPanel>
                        </Slide>
                        <Slide
                            direction={direction}
                            in={value === '4'}
                            mountOnEnter
                            unmountOnExit
                        >
                            <TabPanel value="4">
                                <Saved />
                            </TabPanel>
                        </Slide>
                        <Slide
                            direction={direction}
                            in={value === '5'}
                            mountOnEnter
                            unmountOnExit
                        >
                            <TabPanel value="5">
                                <UpVoted />
                            </TabPanel>
                        </Slide>
                        <Slide
                            direction={direction}
                            in={value === '6'}
                            mountOnEnter
                            unmountOnExit
                        >
                            <TabPanel value="6">
                                <DownVoted />
                            </TabPanel>
                        </Slide>
                    </>
                )}
            </TabContext>
        </Box>
    );
};

export default TabsMain;
