import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useTheme } from '@emotion/react';
import { CardMedia } from '@mui/material';
import { useMediaQuery } from '@mui/material';

export default function GetApp() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const matches = useMediaQuery('(max-width:600px)');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                variant="outlined"
                onClick={handleOpen}
                sx={{
                    color: theme.palette.typography.color,
                    borderColor: theme.palette.typography.color,
                    mx: 1,
                    borderRadius: '50px',
                    '&:focus': {
                        borderColor: theme.palette.typography.color,
                        color: theme.palette.typography.color,
                    },
                    '&:hover': {
                        borderColor: theme.palette.typography.color,
                        color: theme.palette.typography.color,
                    },
                    display: {
                        xs: 'none',
                        lg: 'inline-flex',
                    },
                }}
            >
                <QrCodeScannerIcon />
                <span style={{ marginLeft: '5px' }}>Get App</span>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: matches ? '90%' : '50%',
                            height: matches ? '90%' : '80%',    
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ pb: 2, textAlign: 'center' }}
                        >
                            Get App
                        </Typography>
                        <CardMedia
                            component="img"
                            height={matches ? '70%' : '90%'}
                            width={matches ? '70%' : '90%'}
                            image="/assets/QR.png"
                            alt="Get App"
                            sx={{ cursor: 'pointer',
                            objectFit: 'contain',
                        }}
                            onClick={() =>
                                window.open(
                                    'https://ankitdas98.com/',
                                    '_blank'
                                )}
                        />
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}