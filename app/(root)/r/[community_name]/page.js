'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import axios from '@/utility/axiosConfig.js';
import CommunityHero from '@/components/Community_Components/CommunityHero.js';
import CommunityBody from '@/components/Community_Components/CommunityBody';

const fetchCommunityData = async (communityId) => {
    const response = await axios.get(`/reddit/channel/${communityId}`);
    return response.data;
};

const page = () => {
    const { community_name: communityId } = useParams();
    

    return (
        <div>
          <CommunityHero communityId={communityId} fn={fetchCommunityData} />
          <CommunityBody communityId={communityId} />
        </div>
    );
};

export default page;
