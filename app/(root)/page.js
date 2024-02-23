"use client";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import SideBarPopularCommunity from "@/components/Home_Components/SideBarPopularCommunity";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";


export default function Home() {
  const theme = useTheme();
  const {isUserAuthenticated} = useContext(AuthContext);
  return (
  <Box sx={{
    display: "flex",
    backgroundColor: theme.palette.background.default,
    position: "relative",
    minHeight: "100%",
    width: "100%",
  }}>
    <Grid container spacing={1} justifyContent={isUserAuthenticated() ? `center` : ``}>
      <Grid item xs={12} lg={isUserAuthenticated() ? 10 : 8} sx={{border: "1px solid white"}}>
        
      </Grid>
    </Grid>
    {!isUserAuthenticated() && <SideBarPopularCommunity />}
  </Box>
  );
}
