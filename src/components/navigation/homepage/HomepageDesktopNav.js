import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import ThemeSwitch from '@/components/ThemeSwitch'
import LogoLink from '../LogoLink'
import NavBar from '../Navbar'

const HomepageDesktopNav = ({ user }) => {
  if (user) {
    return <NavBar />
  }
  return (
    <nav className="mx-auto mt-4 flex w-full max-w-[1440px] justify-between self-start px-4">
      <LogoLink
        logoWidth={40}
        textHeight={26}
        textWidth={140}
        svgClass="text-primary"
      />

      <div className="flex">
        <Button asChild className="mr-4 justify-self-end px-4 py-3">
          <Link href="/auth/login" aria-label="Sign in with Discord">
            <FaDiscord className="mr-2 size-[16px]" />
            <span className="hidden md:inline">Sign in with Discord</span>
            <span className="inline md:hidden">Sign in</span>
          </Link>
        </Button>
        <ThemeSwitch className="hidden md:flex" />
      </div>
    </nav>
  )
}

export default HomepageDesktopNav
