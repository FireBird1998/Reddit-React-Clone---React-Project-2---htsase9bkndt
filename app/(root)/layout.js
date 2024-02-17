"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import TopBar from "@/components/Navigation_Components/TopBar";

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
      paper: "#162227",
    },
    divider: "rgba(133,133,133,0.69)",
  },
};

const theme = createTheme(themeOptions);

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <main className="root">
        <TopBar />
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Layout;
