import React from 'react';
import SelectorEl from './SelectorEl';
import { Box, Divider, Typography } from '@mui/material';

const UpVoted = () => {
    const [filter, setFilter] = React.useState('new');
    return (
        <Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h1" color="textSecondary">
                Feature coming soon!
            </Typography>
        </Box>
    );
};

export default UpVoted;
