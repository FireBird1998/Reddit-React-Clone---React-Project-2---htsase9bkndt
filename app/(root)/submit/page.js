"use client";
import SideGuid from "@/components/CreatePost_Component/SideGuid";
import CreatePostComponent from "@/components/CreatePost_Component/CreatePostComponent";
import { Grid } from "@mui/material";
import { useAuthRedirect } from "@/hooks";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { CreatePostContextProvider } from "@/context/CreatePostContext";

const CreatePost = () => {
  useAuthRedirect("/signIn");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  
  return (
    <Grid
      container
      component="main"
      justifyContent="center"
      alignItems="center"
      bgcolor="transparent"
      direction={isSmallScreen ? 'column' : 'row'}
    >
      <Grid item xs={12} lg={9}>
        <CreatePostContextProvider>
          <CreatePostComponent />
        </CreatePostContextProvider>
      </Grid>
      <Grid item xs={12} lg={3}>
        <SideGuid />
      </Grid>
    </Grid>
  );
};

export default CreatePost;
