'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import axios from '@/utility/axiosConfig.js';
import CommunityHero from '@/components/Community_Components/CommunityHero.js';

const fetchCommunityData = async (communityId) => {
    const response = await axios.get(`/reddit/channel/${communityId}`);
    return response.data;
};
const fetchCommunityPosts = async (communityId) => {
  const response = await axios.get(`/reddit/channel/${communityId}/posts`);
  return response.data;
};
const page = () => {
    const { community_name: communityId } = useParams();
    

    return (
        <div>
          <CommunityHero communityId={communityId} fn={fetchCommunityData} />
            
        </div>
    );
};

export default page;
