import './globals.css'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { CssBaseline } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Redit Clone',
  description: 'Created By FireBird',
}




export default function RootLayout({ children }) {
  return (
    <html lang="en">


      {/* reset all styles */}
      <CssBaseline />

      <body className={inter.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
