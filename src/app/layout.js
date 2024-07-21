import '../styles/globals.css'
import NavBar from '@/components/navigation/Navbar'
import { fetchTerms } from '@/lib/fetchTerms'

export default async function RootLayout({ children }) {
  const terms = await fetchTerms()

  return (
    <html lang="en">
      <head />
      <body>
        <NavBar />
        <div className="flex-1">{children}</div>
        {/* <div className="flex-1 p-4">{children}</div> */}
      </body>
    </html>
  )
}
