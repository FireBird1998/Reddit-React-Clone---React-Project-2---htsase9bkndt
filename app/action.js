'use server';
import axios from '@/utility/axiosServerConfig';

export const getPosts = async (pageParam, limit = 10) => {
    try {
        const { data } = await axios.get(
            `/reddit/post?limit=${limit}&page=${pageParam}`,
        );

        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getPostsFilter = async (
  pageParam,
  limit = 10,
  filter = {},
) => {
  try {
      const filterParam = typeof filter === 'string' ? filter : JSON.stringify(filter);
      const { data } = await axios.get(
          `/reddit/post?limit=${limit}&page=${pageParam}&filter=${filterParam}`,
      );

      return data.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};


export const getPostsSort = async (
  pageParam,
  limit = 10,
  sort = {},
) => {
  try {
      const sortParam = encodeURIComponent(JSON.stringify(sort));
      const { data } = await axios.get(
          `/reddit/post?limit=${limit}&page=${pageParam}&sort=${sortParam}`,
      );

      return data.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};