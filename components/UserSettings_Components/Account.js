import { Box, Typography } from '@mui/material'
import React from 'react'

const Account = () => {
  return (
    <Box sx={{
        mt: 2,
    }}>
        <Typography variant="h6" component="div" fontWeight={500}>
            Account settings
        </Typography>
        
    </Box>

  )
}

export default Account