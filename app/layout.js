import './globals.css'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Redit Clone',
  description: 'Created By FireBird',
}




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>          
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
