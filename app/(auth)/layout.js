'use client';
import AuthTopBar from '@/components/Auth_Components/AuthTopBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from '@/context/AuthContext';
const themeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ff4500',
        },
        background: {
            default: '#000000',
            paper: '#1a1d1f',
        },
        divider: 'rgba(133,133,133,0.69)',
        typography: {
            color: 'white',
        },
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
