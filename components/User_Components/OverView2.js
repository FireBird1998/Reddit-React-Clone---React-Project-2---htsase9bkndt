import React from 'react';
import SelectorEl from '../Profile_components/SelectorEl';
import { Box, Divider } from '@mui/material';
import Loading2 from './Loading2';

const OverView2 = ({user}) => {
    const [filter, setFilter] = React.useState('new');
    // console.log(user);
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    justifyContent: 'start',
                    gap: 2,
                }}
            >
                <SelectorEl filter={filter} setFilter={setFilter} />
            </Box>
            <Divider sx={{ my: 1 }} />
            {/* <Loading2 filter={filter} user={user} /> */}
        </Box>
    );
};

export default OverView2;

