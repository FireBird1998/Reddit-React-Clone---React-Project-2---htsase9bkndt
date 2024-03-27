import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';

const SelectorEl = ({filter, setFilter}) => {
    
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

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

    const menuItemStyles = {
        
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    };

    const labelStyles = {
        color: theme.palette.secondary.dark,
        '&.Mui-focused': {
            color: theme.palette.secondary.main,
        },
    };


    return (
        <div>
            <FormControl sx={{ mt: 2, minWidth: 80 }}>
                <InputLabel id="Sortby" sx={labelStyles}>
                    Sort by
                </InputLabel>
                <Select
                    labelId="Sortby"
                    id="select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    variant="outlined"
                    value={filter}
                    label="Sort by"
                    onChange={handleChange}
                    sx={selectStyles}
                >
                    <MenuItem value={'new'} sx={menuItemStyles}>
                        New
                    </MenuItem>
                    <MenuItem value={'hot'} sx={menuItemStyles}>
                        Hot
                    </MenuItem>
                    <MenuItem value={'top'} sx={menuItemStyles}>
                        Top
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectorEl;
