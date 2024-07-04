// app/layout.js
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import Sidebar from '../components/Sidebar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
              <NavigationMenuItem>Item One</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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