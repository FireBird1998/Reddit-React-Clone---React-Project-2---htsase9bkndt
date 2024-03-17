"use client";
import React from 'react'
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from '@/utility/axiosConfig';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import PostEl from '@/components/shared/Post_Components/PostEl';


const page = () => {
  const { id } = useParams()
  const theme = useTheme()
  const fetchPost = async () => {
    const { data } = await axios.get(`/reddit/post/${id}`)
    return data.data
  }
  const { data, isLoading, isError, error } = useQuery('post', fetchPost)
  if (isLoading) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <div>page</div>
  )
}

export default page