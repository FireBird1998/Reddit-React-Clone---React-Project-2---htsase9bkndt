import React from 'react';
import SelectorEl from './SelectorEl';
import Loading from './Loading';
import { Box, Divider, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';


const OverView = () => {
    const [filter, setFilter] = React.useState('new');
    const theme = useTheme();
    const router = useRouter();

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
                <Button
                    variant="outlined"
                    onClick={() => router.push('/submit')}
                    sx={{ 
                        my: 2, 
                        color: theme.palette.typography.color, 
                        borderColor: theme.palette.typography.color,
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 2,
                    }}
                >
                    <AddIcon/> create a new post
                </Button>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Loading filter={filter} />
        </Box>
    );
};

export default OverView;
