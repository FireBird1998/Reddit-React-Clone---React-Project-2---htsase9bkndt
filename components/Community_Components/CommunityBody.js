import { Grid } from '@mui/material'
import React from 'react'
import CommunityLoad from './CommunityLoad'
import CreatePostHomeEl from '../Home_Components/CreatePostHomeEl'
import SideGuid from '../CreatePost_Component/SideGuid'



const CommunityBody = ({communityId}) => {
  return (
    <Grid
        container
        spacing={3}
        justifyContent={`center`}
        alignContent={`flex-start`}
    >
        <Grid item xs={12} lg={6}>
            <CreatePostHomeEl/>
            <CommunityLoad communityId={communityId}/>
        </Grid>
        <Grid item xs={false} lg={3}>
            <SideGuid /> 
        </Grid>

    </Grid>
  )
}

export default CommunityBody