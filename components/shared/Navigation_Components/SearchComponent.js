'use client';
import React, { useContext, useState } from 'react';
import {
    Modal,
    Typography,
    InputBase,
    IconButton,
    Box,
    useMediaQuery,
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { ModalContext } from '@/context/SearchModalContext';
import axios from '@/utility/axiosConfig';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { throttle } from 'lodash';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 5,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%', // input should take the full width of the Search component
    },
}));

const SearchComponent = () => {
    const { isOpen, toggleModal } = useContext(ModalContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const modalStyle = {
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : 600, // adjust as needed
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const fetchPosts = async (key, searchTerm) => {
        const { data } = await axios.get(
            `/reddit/post?search={"field":"${searchTerm}"}`,
        );
        return data;
    };

    const {
        data: searchRes,
        isLoading,
        isError,
    } = useQuery(['search', searchTerm], fetchPosts, {
        enabled: !!searchTerm, // only run the query if searchTerm is not empty
    });

    const throttledHandleSearch = throttle((value) => {
        setSearchTerm(value);
    }, 500); // delay in ms

    const handleSearch = (event) => {
        throttledHandleSearch(event.target.value);
    };
    return (
        <Modal
            open={isOpen}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'searchModal' }}
                        onClick={handleSearch}
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Search>
            </Box>
        </Modal>
    );
};

export default SearchComponent;
