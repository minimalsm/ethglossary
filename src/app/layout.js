import '../styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import NavBar from '@/components/navigation/Navbar'
import { fetchTerms } from '@/lib/fetchTerms'

export default async function RootLayout({ children }) {
  const terms = await fetchTerms()

  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
          <NavBar />
          <div className="flex-1">{children}</div>
          {/* <div className="flex-1 p-4">{children}</div> */}
        </AuthProvider>
      </body>
    </html>
  )
}
