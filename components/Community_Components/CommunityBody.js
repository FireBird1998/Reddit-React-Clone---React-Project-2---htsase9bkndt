'use client';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import CommunityLoad from './CommunityLoad';
import CreatePostHomeEl from '../Home_Components/CreatePostHomeEl';
import SideGuid from '../CreatePost_Component/SideGuid';
import { AuthContext } from '@/context/AuthContext';

const CommunityBody = ({ communityId }) => {
    const { isUserAuthenticated } = useContext(AuthContext);
    return (
        <Grid
            container
            spacing={3}
            justifyContent={`center`}
            alignContent={`flex-start`}
        >
            <Grid item xs={12} lg={6}>
                {isUserAuthenticated() && <CreatePostHomeEl />}
                <CommunityLoad communityId={communityId} />
            </Grid>
            <Grid item xs={false} lg={isUserAuthenticated ? 3 : 4}>
                <SideGuid />
            </Grid>
        </Grid>
    );
};

export default CommunityBody;
