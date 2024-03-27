import React from 'react';
import SelectorEl from './SelectorEl';
import { Box, Divider } from '@mui/material';

const OverView = () => {
    const [filter, setFilter] = React.useState('new');
    return (
        <Box>
            <SelectorEl filter={filter} setFilter={setFilter} />
            <Divider sx={{ my: 2 }} />
            hello
        </Box>
    );
};

export default OverView;
