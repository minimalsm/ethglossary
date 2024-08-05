import Image from 'next/image'
import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import ThemeSwitch from '@/components/ThemeSwitch'
import LogoLink from '../LogoLink'

const HomepageDesktopNav = () => {
  return (
    <nav className="mt-4 flex w-full justify-between self-start">
      <LogoLink
        logoWidth={40}
        textHeight={26}
        textWidth={140}
        svgClass="text-primary"
      />

      <div>
        <Button asChild className="mr-4 justify-self-end px-4 py-3">
          <Link href="/auth/login" aria-label="Sign in with Discord">
            <FaDiscord className="mr-2 size-[16px]" />
            <span className="hidden text-xs font-bold leading-[12px] md:block">
              Sign in with Discord
            </span>
            <span className="text-xs font-bold leading-[12px] md:hidden">
              Sign in
            </span>
          </Link>
        </Button>
        <ThemeSwitch className="hidden" />
      </div>
    </nav>
  )
}

export default HomepageDesktopNav
