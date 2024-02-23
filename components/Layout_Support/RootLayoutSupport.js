import React from "react";
import { Box } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const RootLayoutSupport = ({children}) => {
    const { isUserAuthenticated } = useContext(AuthContext);
  return (
    <Box
      sx={{
        padding: "20px",
        position: "absolute",
        width: {
          xs: "100%", // take full width on xs screens
          lg: isUserAuthenticated() ? "100%"  : "calc(100% - 250px)", // subtract width of drawer
          xl: isUserAuthenticated() ? "100%"  : "calc(100% - 250px)", // subtract width of drawer
        },
        height: "100%",
        overflow: "auto",
        bgcolor: "background.default",
        right: 0,
        top: 0,
      }}
    >
      {children}
    </Box>
  );
};

export default RootLayoutSupport;
