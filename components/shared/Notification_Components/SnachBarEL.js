import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';

const SnackbarEL = ({ message, setMessage }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage(''); 
        setOpen(false);
    };

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
            message={message}
        />
    );
};

export default SnackbarEL;