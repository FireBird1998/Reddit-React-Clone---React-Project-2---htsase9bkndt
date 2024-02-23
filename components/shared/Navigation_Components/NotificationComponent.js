import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from '@mui/material/Badge';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Tooltip from '@mui/material/Tooltip';

const MyIconButton = ({ popupState, notifications = 0 }) => (
  notifications > 0 ? (
    <Tooltip title={`Show ${notifications} new notifications`} placement="right">
      <IconButton {...bindToggle(popupState)} size="large" aria-label={`show ${notifications} new notifications`} color="inherit" sx={{ borderRadius: 20 / 5 }}>
        <Badge badgeContent={notifications} color="error">
          <NotificationsOutlined />
        </Badge>
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="No new notifications">
      <IconButton {...bindToggle(popupState)} size="large" aria-label="no new notifications" color="inherit" sx={{ borderRadius: 20 / 5 }}>
        <NotificationsOutlined />
      </IconButton>
    </Tooltip>
  )
);

const MyPopper = ({ popupState }) => (
  <Popper {...bindPopper(popupState)} transition>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        <Paper>
          <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
        </Paper>
      </Fade>
    )}
  </Popper>
);

const PopperPopupState = () => {
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <>
          <MyIconButton popupState={popupState} notifications={6} />
          <MyPopper popupState={popupState} />
        </>
      )}
    </PopupState>
  );
};

const NotificationComponent = () => {
  return <PopperPopupState />;
};

export default NotificationComponent;
