"use client";
import { Box } from "@mui/material";
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
    <Box>
      <h1>Home</h1>
    </Box>
    {!isUserAuthenticated() && <SideBarPopularCommunity />}
  </Box>
  );
}
