import SideGuid from '@/components/CreatePost_Component/SideGuid';
import { Grid } from '@mui/material';
import React from 'react';


const CreatePost = () => {
    
    return (
        <Grid container component="main" justifyContent="center" alignItems="center" bgcolor="transparent">
                <Grid item xs={9}>
                        <h1>Create Post</h1>
                </Grid>
                <Grid item xs={3}>
                        <SideGuid />
                </Grid>
                <Grid item xs={9}>
                    <h1>Post Form</h1>
                </Grid>

        </Grid>
    )
}

export default CreatePost