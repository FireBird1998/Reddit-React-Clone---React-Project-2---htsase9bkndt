'use client'; 
import React from 'react'
import { useParams } from 'next/navigation';

const User = () => {
  const { user } = useParams()
  return (
    <div>User {user}</div>
  )
}

export default User