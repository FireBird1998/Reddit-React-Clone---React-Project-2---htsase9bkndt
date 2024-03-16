'use server';
import PostEl from '@/components/shared/Post_Components/PostEl';
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
