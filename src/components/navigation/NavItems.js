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
export default function NavItems({
  user,
  avatarUrl,
  translateLink,
  navSections,
}) {
  const pathname = usePathname()
  const pathHasLang = pathname.includes('/fr')

  return (
    <>
      {/* <div
        asChild
        className={cn(
          'p-2',
          pathname.includes('/fr')
            ? 'font-bold bg-[#F4F4F4] border-b border-black'
            : '',
        )}
      >
        {translateLink}
      </div> */}
      {navSections.map((section, index) => (
        <div key={index}>
          <NavItemList items={section.items} pathname={pathname} />
        </div>
      ))}
    </>
  )
}

const NavItemList = ({ items, pathname }) => {
  return (
    <div className="flex gap-6">
      {items.map((item, index) => (
        <NavItem key={index} href={item.href} pathname={pathname}>
          {item.linkText}
        </NavItem>
      ))}
    </div>
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
