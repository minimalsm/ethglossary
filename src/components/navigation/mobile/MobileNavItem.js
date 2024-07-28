'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/auth/LogoutButton'

const MobileNavItem = ({
  href,
  linkText,
  defaultLanguage,
  translatingNow = false,
}) => {
  const pathname = usePathname()
  const isActive = pathname === href
  const isTranslateLink = href === '/translate'
  const getTranslateRoute = () => {
    if (href === '/translate') {
      return defaultLanguage ? `/${defaultLanguage}/hello` : '/languages'
    }
    return href
  }

  const translateRoute = getTranslateRoute()

  if (href === '/logout')
    return (
      <div
        className={cn(
          'py-3 px-4 font-serif text-xl rounded-[8px]',
          isActive ? 'bg-[#31222F]' : '',
        )}
      >
        <LogoutButton />
      </div>
    )
  return (
    <a
      href={isTranslateLink ? translateRoute : href}
      className={cn(
        'py-3 px-4 font-serif text-xl rounded-[8px]',
        isActive ? 'bg-[#31222F]' : '',
      )}
      prefetch={false}
    >
      <p className={cn(isActive ? 'font-bold' : '')}>{linkText}</p>
      {translatingNow && <TranslatingNow />}
    </a>
  )
}

const TranslatingNow = () => {
  return (
    <p className="mt-3 text-xs">
      Translating now: <span className="font-semibold">Français</span>
    </p>
  )
}

export default MobileNavItem
