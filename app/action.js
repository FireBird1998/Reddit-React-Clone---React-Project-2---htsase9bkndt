'use server';
import axios from '@/utility/axiosServerConfig';

export const getPosts = async ( pageParam, limit = 10 ) => {
  try {
    const { data } = await axios.get(`reddit/post?limit=${limit}&page=${pageParam}`);
    

    return data.data;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPostsFilter = async ( pageParam, limit = 10, filter ) => {
  
};