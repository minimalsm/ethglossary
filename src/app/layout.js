// app/layout.js
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import Sidebar from '@/components/Sidebar'
import NavBar from '@/components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
          <NavBar />
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}