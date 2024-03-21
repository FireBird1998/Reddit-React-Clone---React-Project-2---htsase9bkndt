"use client";
import React from 'react'
import { useParams } from 'next/navigation';
import { Box } from '@mui/material';
import ProfileHero from '@/components/Profile_components/ProfileHero';
const page = () => {
    const { id } = useParams();
  return (
    <Box>
      <ProfileHero />
    </Box>
  )
}

export default page