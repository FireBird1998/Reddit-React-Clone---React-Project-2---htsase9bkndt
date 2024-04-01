import { Box, Typography } from '@mui/material'
import React from 'react'

const Profile = () => {
  return (
    <Box sx={{
        mt: 2,
    }}>
        <Typography variant="h6" component="div" fontWeight={500}>
            Profile settings
        </Typography>
        <Typography variant="h1" component="div">
            Feature coming soon 
        </Typography>

    </Box>
  )
}

export default Profile