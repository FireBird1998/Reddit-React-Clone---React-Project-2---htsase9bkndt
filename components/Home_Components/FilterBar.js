'use client';
import React from 'react';
import {
    Paper,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import RocketOutlinedIcon from '@mui/icons-material/RocketOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { FilterBarContext } from '@/context/FilterBarContex';

const FilterBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { activeButton, toggleButton } = React.useContext(FilterBarContext);
    const buttons = [
        { name: 'Best', icon: RocketOutlinedIcon },
        { name: 'Hot', icon: LocalFireDepartmentOutlinedIcon },
        { name: 'New', icon: NewReleasesOutlinedIcon },
        { name: 'Top', icon: ArrowCircleUpOutlinedIcon },
    ];

    return (
        <Paper
            sx={{
                padding: '10px',
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {buttons.map((button) => {
                const { name, icon: Icon } = button;
                return (
                    <IconButton
                        size={isMobile ? 'medium' : 'large'}
                        key={name}
                        onClick={() => toggleButton(name)}
                        color={activeButton === name ? 'secondary' : 'default'}
                        sx={{
                            borderRadius: '10px',
                            marginLeft: '10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            },
                            '@media (prefers-color-scheme: light)': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            },
                            '@media (prefers-color-scheme: dark)': {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                },
                            },
                        }}
                    >
                        <Icon />
                        <Typography
                            sx={{
                                fontFamily: '"IBM Plex Sans", sans-serif',
                                fontWeight: '700',
                                marginLeft: '5px',
                                fontSize: { xs: '0.75rem', sm: '1rem' },
                            }}
                        >
                            {name}
                        </Typography>
                    </IconButton>
                );
            })}
        </Paper>
    );
};

export default FilterBar;
