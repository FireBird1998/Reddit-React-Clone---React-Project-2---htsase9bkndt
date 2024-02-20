"use client"
import AuthTopBar from '@/components/Auth_Components/AuthTopBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#777b5f',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#000000',
            paper: '#000000', 
        },
        divider: 'rgba(133,133,133,0.69)',
    },
};

const theme = createTheme(themeOptions);

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <header>
          <AuthTopBar />
        </header>
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;