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

export default function TermsModal({ terms, languageCode }) {
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
          <SheetTitle>EthGlossary</SheetTitle>
        </SheetHeader>
        <Sidebar terms={terms} languageCode={languageCode} />
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
