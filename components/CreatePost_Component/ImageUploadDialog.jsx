'use client';
import React, { useState, useContext } from 'react';
import { CreatePostContext } from '@/context/CreatePostContext';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Divider,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import Image from 'next/image';

function ImageUploadDialog() {
    const [open, setOpen] = useState(false);
    const { fileData, setFileData } = useContext(CreatePostContext);
    const theme = useTheme();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileData(file);
        handleClose();
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                {fileData ? 'Change Image' : 'Upload Image'}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Image</DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        type="file"
                        onChange={handleFileChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {fileData && (
                        <div>
                            <p>Selected file: {fileData.name}</p>
                            <Image
                                src={URL.createObjectURL(fileData)}
                                width={200}
                                height={200}
                            />
                            <br />
                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={() => setFileData(null)}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ImageUploadDialog;
