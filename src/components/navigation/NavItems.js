// components/NavItems.js
'use client'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/auth/LogoutButton'

const NAV_ITEMS = {
  '/': 'Home',
  '/languages': 'Languages',
  '/leaderboard': 'Leaderboard',
}

// Todos:
// [x] Add login
// [x] Fix logout button
// [] Refactor to use NAV_ITEMS object
export default function NavItems({ user, avatarUrl, translateLink }) {
  const pathname = usePathname()
  const pathHasLang = pathname.includes('/fr')

  return (
    <>
      <div
        asChild
        className={cn(
          'p-2',
          pathHasLang ? 'font-bold bg-[#F4F4F4] border-b border-black' : '',
        )}
      >
        {translateLink}
      </div>
      <NavItem href="/languages" pathname={pathname}>
        Languages
      </NavItem>
      <NavItem href="/leaderboard" pathname={pathname}>
        Leaderboard
      </NavItem>
      {user ? (
        <>
          <LogoutButton />
        </>
      ) : (
        <a
          href="/auth/login"
          className={cn('p-2', pathname === '/auth/login' ? 'font-bold' : '')}
          prefetch={false}
        >
          Login
        </a>
      )}
    </>
  )
}

const NavItem = ({ href, pathname, children }) => {
  return (
    <a
      href={href}
      className={cn(
        'p-2',
        pathname === href ? 'font-bold  border-b border-black' : '',
      )}
      prefetch={false}
    >
      {children}
    </a>
  )
}
