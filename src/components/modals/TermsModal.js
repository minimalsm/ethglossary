import { Button } from '@/components/ui/button'
// import Sidebar from '@/components/navigation/Sidebar'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Close } from '@/components/icons'
import LogoLink from '@/components/navigation/LogoLink'

export default function TermsModal({ children, terms, languageCode }) {
  return (
    <Sheet direction="left" className="content-none">
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MenuIcon /> Terms
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        // className="content-none my-auto fixed right-auto inset-y-0 left-0 z-50 h-full w-80 bg-background transition-transform transform translate-x-full md:translate-x-0"
      >
        <SheetHeader>
          <SheetTitle className="text-left font-sans text-xl">
            <LogoLink />
          </SheetTitle>
          <SheetClose>
            <button
              className="absolute right-4 top-4 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Close menu"
            >
              <Close />
            </button>
          </SheetClose>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

const MenuIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-square-menu"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M7 16h10" />
    </svg>
  )
}
