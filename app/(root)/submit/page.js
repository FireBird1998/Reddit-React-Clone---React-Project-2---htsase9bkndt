"use client";
import SideGuid from "@/components/CreatePost_Component/SideGuid";
import CreatePostComponent from "@/components/CreatePost_Component/CreatePostComponent";
import { Grid } from "@mui/material";
import { useAuthRedirect } from "@/hooks";

import { CreatePostContextProvider } from "@/context/CreatePostContext";

const CreatePost = () => {
  useAuthRedirect("/signIn");

  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      bgcolor="transparent"
    >
        
      <Grid item xs={9}>
        <CreatePostContextProvider>
          <CreatePostComponent />
        </CreatePostContextProvider>
      </Grid>
      <Grid item xs={3}>
        <SideGuid />
      </Grid>
    </Grid>
  );
};

export default CreatePost;
