"use client";
import AuthTopBar from "@/components/Auth_Components/AuthTopBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "@/context/AuthContext";
const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#777b5f",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    divider: "rgba(133,133,133,0.69)",
  },
};

const theme = createTheme(themeOptions);
const queryClient2 = new QueryClient();
const Layout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient2}>
      <ThemeProvider theme={theme}>
        <div>
          <header>
            <AuthTopBar />
          </header>
          <AuthProvider>
          <main>{children}</main>
          </AuthProvider>
        </div>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default Layout;
