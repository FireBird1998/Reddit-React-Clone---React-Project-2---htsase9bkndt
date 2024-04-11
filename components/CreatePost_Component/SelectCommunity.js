'use client';
import React, { useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CreatePostContext } from '@/context/CreatePostContext';
import { useQuery } from 'react-query';
import axios from '@/utility/axiosConfig';
import { useTheme } from '@emotion/react';

const SelectCommunity = () => {
    const { community, setCommunity } = useContext(CreatePostContext);
    const theme = useTheme();
    const selectStyles = {
        borderColor: theme.palette.secondary.dark,
       
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
        },
    };
    const fetchPopularCommunities = async () => {
        const { data } = await axios.get('/reddit/channel');
        return data.data;
    };

    const { data, isLoading, isError, error } = useQuery(
        'popularCommunities',
        fetchPopularCommunities,
    );

    const handleChange = (event) => {
        setCommunity(event.target.value);
    };

    if (isLoading) return 'Loading...';
    if (isError) return `An error occurred: ${error.message}`;

    return (
        <FormControl sx={{ my: 1, minWidth: 300 }}>
            <InputLabel id="community"
                sx={{
                    '&.MuiInputLabel-root': {
                        color: theme.palette.secondary.main,
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                    {
                        borderColor: theme.palette.secondary.main,
                    },
                }}
            >Select Community</InputLabel>
            <Select
                labelId="community"
                id="community_helper"
                value={community}
                label="Select Community"
                onChange={handleChange}
                sx={selectStyles}
            >
                {data?.map((community) => (
                    <MenuItem key={community._id} value={community}>
                        {community.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectCommunity;
