import './globals.css'
import { AuthProvider } from './context/AuthContext'
import Sidebar from '@/components/Sidebar'
import NavBar from '@/components/Navbar'
import { fetchTerms } from './lib/fetchTerms'

export default async function RootLayout({ children }) {
  const terms = await fetchTerms()

  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
          <NavBar />
          <div className="flex">
            <Sidebar terms={terms} />
            <div className="flex-1 p-4">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
