import '../styles/globals.css'
import NavBar from '@/components/navigation/Navbar'
import { fetchTerms } from '@/lib/fetchTerms'
import { Inter, Noto_Serif } from 'next/font/google'

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
    <html lang="en" className={inter.className}>
      <head />
      <body className="background">
        {/* <NavBar className="" /> */}
        {/* Taking off layout to dev homepage */}
        {/* <div className="flex-1 mx-5 md:mx-12 md:my-8">{children}</div> */}
        <div className="">{children}</div>
      </body>
    </html>
  )
}
