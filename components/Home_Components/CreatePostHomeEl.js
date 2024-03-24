import { Paper, IconButton } from "@mui/material";
import React from "react";
import AvatarEl from "../shared/Navigation_Components/AvatarEl";
import TextField from "@mui/material/TextField";
import ImageIcon from '@mui/icons-material/Image';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { useRouter } from "next/navigation";

const CreatePostHomeEl = () => {
    const router = useRouter();
    const handleCreatePost = () => {
        router.push("/submit");
    };
  return (
    <Paper
      sx={{
        padding: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.2)", // Add border
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
        onClick={handleCreatePost}
    >
      <AvatarEl />
      <TextField
        id="outlined-basic"
        label="Create Post"
        variant="outlined"
        sx={{ marginLeft: "10px", width: "85%" }} // Added margin and width
        onClick={handleCreatePost}
        autoComplete="off"
      />
        <IconButton 
            onClick={handleCreatePost}
            size="large" 
            sx={{
                borderRadius: "10px", // Add border radius
                marginLeft: "10px", // Add margin   
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Add slight black background
                '&:hover': {
                    backgroundColor: "rgba(0, 0, 0, 0.2)", // Add hover effect
                },
                '@media (prefers-color-scheme: light)': { // Add styles for light theme
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    '&:hover': {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                },
                '@media (prefers-color-scheme: dark)': { // Add styles for dark theme
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    '&:hover': {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                },
            }}
        >
            <ImageIcon />
        </IconButton>
        <IconButton 
            onClick={handleCreatePost}
            size="large" 
            sx={{
                borderRadius: "10px", // Add border radius
                marginLeft: "10px", // Add margin   
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Add slight black background
                '&:hover': {
                    backgroundColor: "rgba(0, 0, 0, 0.2)", // Add hover effect
                },
                '@media (prefers-color-scheme: light)': { // Add styles for light theme
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    '&:hover': {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                },
                '@media (prefers-color-scheme: dark)': { // Add styles for dark theme
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    '&:hover': {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                },
            }}
        >
            <InsertLinkIcon />
        </IconButton>
    </Paper>
  );
};

export default CreatePostHomeEl;
