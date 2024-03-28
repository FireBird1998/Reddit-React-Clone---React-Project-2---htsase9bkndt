'use client'; 
import React from 'react'
import { useParams } from 'next/navigation';
import { useAuthRedirect } from '@/hooks';
import { useQuery } from 'react-query';
import axios from '@/utility/axiosConfig';
const User = () => {
  // useAuthRedirect('/signIn');
  const { user } = useParams();
  const fetchUserData = async (user) => {
    try {
      const res = await axios.get(`reddit/user/${user}`);
      return res.data;
    } catch (err) {
      throw new Error('Failed to fetch user data');
    }
  };

  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
    error,
  } = useQuery(['userData', user], () => fetchUserData(user));

  if (isUserLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  

  return (
    <div>User {user}</div>
  )
}

export default User