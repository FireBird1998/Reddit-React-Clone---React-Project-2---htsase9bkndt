import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Redit Clone',
  description: 'Created By FireBird',
}




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <body className={inter.className}>
        <AppRouterCacheProvider>          
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
