import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerOverlay,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/navigation/Sidebar'

export default function TermsModal({ terms, languageCode }) {
  return (
    <Drawer direction="left" className="content-none">
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <MenuIcon /> Terms
        </Button>
      </DrawerTrigger>
      <DrawerContent className="content-none my-auto fixed right-auto inset-y-0 left-0 z-50 h-full w-80 bg-background transition-transform transform translate-x-full md:translate-x-0">
        <DrawerHeader>
          <DrawerTitle>Terms</DrawerTitle>
        </DrawerHeader>
        <Sidebar terms={terms} languageCode={languageCode} />
      </DrawerContent>
    </Drawer>
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
