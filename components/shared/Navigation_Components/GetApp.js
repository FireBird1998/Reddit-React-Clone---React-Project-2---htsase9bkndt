import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useTheme } from '@emotion/react';
import { CardMedia } from '@mui/material';

export default function GetApp() {
    const theme = useTheme();
    return (
        <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
                <div>
                    <Button
                        variant="outlined"
                        {...bindToggle(popupState)}
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
                    <Popper
                        {...bindPopper(popupState)}
                        transition
                        sx={{ zIndex: 2000, mt: 2 }}
                        placement="bottom"
                    >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <Typography
                                        sx={{ p: 2, textAlign: 'center' }}
                                    >
                                        Get App
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height={150}
                                        width={150}
                                        image="/assets/QR.png"
                                        alt="Get App"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            window.open(
                                                'https://ankitdas98.com/',
                                                '_blank'
                                            )}
                                    />
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            )}
        </PopupState>
    );
}
