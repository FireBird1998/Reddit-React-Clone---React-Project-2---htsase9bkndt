import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

const MyIconButton = ({ handleToggle, open }) => (
  <Tooltip title="Chat">
    <IconButton
      size="large"
      aria-label="chat"
      color="inherit"
      sx={{ borderRadius: 20 / 5, backgroundColor: open ? "grey" : "inherit" }}
      onClick={handleToggle}
    >
      <TextsmsOutlinedIcon />
    </IconButton>
  </Tooltip>
);

const MinimizedChatWindow = ({ handleOpen, handleClose }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      right: 50,
      minWidth: "100px",
      height: "50px",
      backgroundColor: "grey",
      borderRadius: "25px 25px 0 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      padding: "0 10px",
    }}
    onClick={handleOpen}
  >
    <Typography>Chat</Typography>
    <IconButton
      aria-label="close"
      onClick={(event) => {
        event.stopPropagation();
        handleClose();
      }}
      sx={{ padding: 0 }}
    >
      <CloseIcon />
    </IconButton>
  </Box>
);

const ChatWindow = ({ open, handleClose, handleMinimize }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 0,
      right: 30,
      minWidth: "300px",
      height: open ? "400px" : "0px",
      display: "block",
    }}
  >
    <Paper sx={{ height: "100%", overflow: "auto", position: "relative" }}>
      <IconButton
        aria-label="minimize"
        onClick={handleMinimize}
        sx={{ position: "absolute", right: 50, top: 0 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <MinimizeIcon />
        </Box>
      </IconButton>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: "absolute", right: 0, top: 0 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography sx={{ p: 2, mt: 3 }}>
        The content of the chat window.
      </Typography>
    </Paper>
  </Box>
);

const MessageComponents = () => {
  const [open, setOpen] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
  };

  const handleClose = () => {
    setOpen(false);
    setMinimized(false);
  };

  const handleMinimize = () => {
    setOpen(false);
    setMinimized(true);
  };

  const handleToggle = () => {
    if (open) {
      handleClose();
    } else if (minimized) {
      handleOpen();
    } else {
      handleOpen();
    }
  };

  return (
    <>
      <MyIconButton handleToggle={handleToggle} open={open} />
      {minimized ? (
        <MinimizedChatWindow
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      ) : (
        <ChatWindow
          open={open}
          handleClose={handleClose}
          handleMinimize={handleMinimize}
        />
      )}
    </>
  );
};

export default MessageComponents;
