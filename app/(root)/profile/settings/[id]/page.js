"use client";
import React from 'react'
import { useAuthRedirect } from '@/hooks'
import { useParams } from 'next/navigation'

const page = () => {
    // useAuthRedirect('/signIn')
    const { id } = useParams()
  return (
    <div>page {id}</div>
  )
}

export default page