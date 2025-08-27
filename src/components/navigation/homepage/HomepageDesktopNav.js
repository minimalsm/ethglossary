import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import ThemeSwitch from '@/components/ThemeSwitch'
import LogoLink from '../LogoLink'
import NavBar from '../Navbar'
import AuthButton from '@/components/auth/AuthButton'

const HomepageDesktopNav = ({ user }) => {
  if (user) {
    return <NavBar />
  }
  return (
    <nav className="mx-auto mt-4 flex w-full max-w-[1440px] justify-between self-start px-4">
      <LogoLink className="[&_img]:w-10 [&_svg]:h-[26px] [&_svg]:w-[140px] [&_svg]:text-primary" />

      <div className="flex">
        <AuthButton className="mr-4 justify-self-end px-4 py-3">
          <FaDiscord className="mr-2 size-[16px]" />
          <span className="hidden md:inline">Sign in with Discord</span>
          <span className="inline md:hidden">Sign in</span>
        </AuthButton>
        <ThemeSwitch className="hidden md:flex" />
      </div>
    </nav>
  )
}

export default HomepageDesktopNav
