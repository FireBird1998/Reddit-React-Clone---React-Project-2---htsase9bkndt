"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useContext } from "react";

import { LayoutProvider } from "@/context/LayoutContext";
import TopBar from "@/components/shared/Navigation_Components/TopBar";
import SideBar from "@/components/shared/Navigation_Components/SideBar";
import { Container } from "@mui/material";

const themeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#0c1416",
    },
    secondary: {
      main: "#ff0004",
    },
    background: {
      default: "#0C1416",
      paper: "#0C1416",
    },
    divider: "rgba(133,133,133,0.69)",
  },
};

const theme = createTheme(themeOptions);

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LayoutProvider>
        <main className="root">
          <TopBar />
          <Container maxWidth='xl' disableGutters  sx={{
            position: "relative",
            mt: {
                xs: "56px", // margin-top for xs and above breakpoints
                sm: "64px", // margin-top for sm and above breakpoints
              },
            padding: 0,
            minHeight: "calc(100vh - 64px)", // subtract height of AppBar
            bgcolor: "background.default",
          }}>
            <SideBar />
            <Box sx={{
                padding: "20px", 
                position: "absolute",

                width: {
                    xs: "100%", // take full width on xs screens
                    lg: "calc(100% - 250px)", // subtract width of drawer
                    xl: "calc(100% - 250px)", // subtract width of drawer
                },
                height: "100%",
                overflow: "auto",
                bgcolor: "background.default",
                right: 0,
                top: 0,  
            }}>
                {children}
            </Box>
          </Container>
        </main>
      </LayoutProvider>
    </ThemeProvider>
  );
};

export default Layout;
