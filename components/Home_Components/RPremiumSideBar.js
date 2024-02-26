import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

const RPremiumSideBar = () => {
  return (
    <Paper 
     sx={{
        padding: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px solid rgba(255, 255, 255, 0.2)",
     }}
    >
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
        }}>
            <Box><SecurityOutlinedIcon sx={{fontSize: "2rem"}} /></Box>
            <Box>
                <Typography
                sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                }}
                >
                    Reddit Premium
                </Typography>
                <Typography>The best Reddit experience, with monthly Coins</Typography>
            </Box>
            
        </Box>
        <Button variant="contained" sx={{
            backgroundColor: "darkorange",
            color: "white",
            marginTop: "10px",
            borderRadius: "50px",
            width: "100%",
            fontWeight: "bold",
            '&:hover': {
                backgroundColor: "darkorange",
            },

        
        }}>Try Now</Button>
    </Paper>
  )
}

export default RPremiumSideBar