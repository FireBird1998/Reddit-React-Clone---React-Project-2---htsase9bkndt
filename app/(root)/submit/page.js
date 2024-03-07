"use client";
import SideGuid from '@/components/CreatePost_Component/SideGuid';
import LexicalEditorEl from '@/components/CreatePost_Component/LexicalEditorEl';
import { Grid } from '@mui/material';
import { useAuthRedirect } from '@/hooks';





const CreatePost = () => {
    useAuthRedirect('/signIn');

    
    return (
        <Grid container component="main" justifyContent="center" alignItems="center" bgcolor="transparent">
                <Grid item xs={9}>
                        <LexicalEditorEl />
                </Grid>
                <Grid item xs={3}>
                        <SideGuid />
                </Grid>
                
        </Grid>
    )
}

export default CreatePost