import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/navigation/Sidebar'

export default function TermsModal({ terms, languageCode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <MenuIcon /> Terms
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms</DialogTitle>
        </DialogHeader>
        <Sidebar terms={terms} languageCode={languageCode} />
      </DialogContent>
    </Dialog>
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
