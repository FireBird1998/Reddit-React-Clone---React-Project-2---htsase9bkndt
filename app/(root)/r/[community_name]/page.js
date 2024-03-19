'use client';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from '@/utility/axiosConfig.js';

const fetchCommunityData = async (userId) => {
    const response = await axios.get(`/reddit/channel/${userId}`);
    return response.data;
};
const page = () => {
  const { community_name: userId } = useParams();
    const pathname = usePathname();
    const { data, status } = useQuery(['communityData', userId], () =>
        fetchCommunityData(userId),
    );

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'error') return <div>Error fetching data</div>;
    return (
        <div>
            <h1>Community: {data.data.name}</h1>
            <h2>Pathname: {pathname}</h2>
        </div>
    );
};

export default page;
