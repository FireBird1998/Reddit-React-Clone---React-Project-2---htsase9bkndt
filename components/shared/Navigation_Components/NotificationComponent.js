import * as React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const MyIconButton = ({ popupState, notifications = 0 }) =>
    notifications > 0 ? (
        <Tooltip
            title={`Show ${notifications} new notifications`}
            placement="right"
        >
            <IconButton
                {...bindTrigger(popupState)}
                size="large"
                aria-label={`show ${notifications} new notifications`}
                color="inherit"
                sx={{ borderRadius: 20 / 5 }}
            >
                <Badge badgeContent={notifications} color="error">
                    <NotificationsOutlined />
                </Badge>
            </IconButton>
        </Tooltip>
    ) : (
        <Tooltip title="No new notifications">
            <IconButton
                {...bindTrigger(popupState)}
                size="large"
                aria-label="no new notifications"
                color="inherit"
                sx={{ borderRadius: 20 / 5 }}
            >
                <NotificationsOutlined />
            </IconButton>
        </Tooltip>
    );

const MyMenu = ({ popupState }) => {
    return (
        <Menu {...bindMenu(popupState)}>
            {/* <MenuItem onClick={popupState.close}> */}
                <Typography sx={{ p: 2 }}>
                    This Feature is will be Comming Soon - notification
                </Typography>
            {/* </MenuItem> */}
        </Menu>
    );
};

const NotificationComponent = () => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <>
                    <MyIconButton popupState={popupState} notifications={6} />
                    <MyMenu popupState={popupState} />
                </>
            )}
        </PopupState>
    );
};

export default NotificationComponent;