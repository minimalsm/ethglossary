import '../styles/globals.css'
import NavBar from '@/components/navigation/Navbar'
import { fetchTerms } from '@/lib/fetchTerms'
import { Inter, Noto_Serif } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children }) {
  const terms = await fetchTerms()

  return (
    // Supressing hydration warning as theme is rendered on server then updated based on user preference
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head />
      <body className="background">
        <Providers>
          <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
