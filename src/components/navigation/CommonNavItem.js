'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/auth/LogoutButton'

export const CommonNavItem = ({
  href,
  linkText,
  defaultLanguage = null,
  translatingNow = false,
  isMobile = false,
  localLanguageName,
}) => {
  const pathname = usePathname()
  const isActive = pathname === href
  const isTranslateLink = href === '/translate'

  const getTranslateRoute = () => {
    if (isTranslateLink) {
      return defaultLanguage ? `/${defaultLanguage}/hello` : '/languages'
    }
    return href
  }

  const translateRoute = getTranslateRoute()

  // Check if the current pathname includes the default language only for the translate link
  const translateRouteActive =
    isTranslateLink && pathname.includes(`/${defaultLanguage}`)

  const containerClassName = isMobile
    ? 'py-3 px-4 font-serif text-xl rounded-[8px]'
    : 'p-2'
  const activeClassName = isMobile ? 'bg-surface-selected' : 'font-bold'
  const textClassName = isMobile ? '' : 'p-2'

  if (href === '/logout') {
    return (
      <div className={cn(containerClassName, isActive && activeClassName)}>
        <LogoutButton />
      </div>
    )
  }

  return (
    <a
      href={isTranslateLink ? translateRoute : href}
      className={cn(
        containerClassName,
        (isActive || translateRouteActive) && activeClassName,
      )}
      prefetch={false}
    >
      <p
        className={cn(
          textClassName,
          (isActive || translateRouteActive) &&
            !isMobile &&
            'rounded-tl-md rounded-tr-md border-b border-black bg-white px-4 font-bold dark:border-primary dark:bg-accent dark:text-primary',
        )}
      >
        {linkText}
      </p>
      {translatingNow && (
        <TranslatingNow localLanguageName={localLanguageName} />
      )}
    </a>
  )
}

const TranslatingNow = ({ localLanguageName }) => {
  return (
    <p className="mt-3 text-xs">
      Translating now:{' '}
      <span className="font-semibold">{localLanguageName}</span>
    </p>
  )
}

export default CommonNavItem
