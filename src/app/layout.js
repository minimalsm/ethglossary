import '../styles/globals.css'
import NavBar from '@/components/navigation/Navbar'
import { fetchTerms } from '@/lib/fetchTerms'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children }) {
  const terms = await fetchTerms()

  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <NavBar className="px-8 md:px-8" />
        <div className="flex-1 p-4 md:px-12 md:py-8">{children}</div>
      </body>
    </html>
  )
}
