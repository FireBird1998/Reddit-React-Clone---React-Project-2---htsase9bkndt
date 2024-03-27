import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '@emotion/react';

const TabsMain = () => {
    const [value, setValue] = React.useState('1');
    const theme = useTheme();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabStyle = {
        borderRadius: '25px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
        '&.Mui-selected': {
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: theme.palette.secondary.main,
        },
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', mt: 1, pb: 1 }}>
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        minWidth: '100%'
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
                        <Tab label="Comments" value="3" sx={tabStyle} />
                        <Tab label="Saved" value="4" sx={tabStyle} />
                        <Tab label="Upvoted" value="5" sx={tabStyle} />
                        <Tab label="Downvoted" value="6" sx={tabStyle} />
                    </TabList>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    );
};

export default TabsMain;
