"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";


import { LayoutProvider } from "@/context/LayoutContext";
import { AuthProvider } from "@/context/AuthContext";


import TopBar from "@/components/shared/Navigation_Components/TopBar";
import SideBar from "@/components/shared/Navigation_Components/SideBar";
import { Container } from "@mui/material";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";


const themeOptions = {
  palette: {
    mode: "dark",
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
    typography: {
        // Add this property
        color: "white",
      },
  },
};

const theme = createTheme(themeOptions);
const queryClient = new QueryClient();

const Layout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LayoutProvider>
          <AuthProvider>
            <main className="root">
              <TopBar />
              <Container
                maxWidth="xl"
                disableGutters
                sx={{
                  position: "relative",
                  mt: {
                    xs: "56px", // margin-top for xs and above breakpoints
                    sm: "64px", // margin-top for sm and above breakpoints
                  },
                  padding: 0,
                  minHeight: {
                    xs: "calc(100vh - 56px)", // viewport height - topbar height
                    sm: "calc(100vh - 64px)", // viewport height - topbar height
                  },
                  bgcolor: "background.default",
                }}
              >
                <SideBar />
                <Box
                  sx={{
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
                  }}
                >
                  {children}
                </Box>
              </Container>
            </main>
          </AuthProvider>
        </LayoutProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default Layout;
