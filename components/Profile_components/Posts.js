import React from 'react';
import SelectorEl from './SelectorEl';
import Loading from './Loading';
import { Box, Divider, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const Posts = () => {
    const [filter, setFilter] = React.useState('new');
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box>
            <SelectorEl filter={filter} setFilter={setFilter} />
            <Divider sx={{ my: 1 }} />
            <Loading filter={filter} />
        </Box>
    );
};

export default Posts;
