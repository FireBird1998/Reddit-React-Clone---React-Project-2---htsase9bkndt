import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip';

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

const MinimizedChatWindow = ({ handleToggle, handleClose }) => (
    <Box
        sx={{
            position: "fixed",
            bottom: 0,
            right: 50,
            minWidth: "100px",
            height: "50px",
            backgroundColor: "grey",
            borderRadius: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "0 10px"
        }}
        onClick={handleClose}
    >
        <Typography>Chat</Typography>
        <IconButton
            aria-label="close"
            onClick={handleToggle}
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
                <MinimizeIcon />
            </IconButton>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: "absolute", right: 0, top: 0 }}
            >
                <CloseIcon />
            </IconButton>
            <Typography sx={{ p: 2, mt: 3 }}>The content of the chat window.</Typography>
        </Paper>
    </Box>
);

const MessageComponents = () => {
    const [open, setOpen] = React.useState(false);
    const [minimized, setMinimized] = React.useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        if (minimized) {
            setMinimized(false);
        }
    };
    const handleClose = () => {
        setOpen(false);
        setMinimized(false);
    };
    const handleMinimize = () => setMinimized(true);

    return (
        <>
            <MyIconButton handleToggle={handleToggle} open={open} />
            {minimized ? (
                <MinimizedChatWindow handleToggle={handleToggle} handleClose={handleClose} />
            ) : (
                <ChatWindow open={open} handleClose={handleClose} handleMinimize={handleMinimize} />
            )}
        </>
    );
};

export default MessageComponents;