import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import CommentsPanel from '@/components/comments/CommentsPanel'

export default function CommentsModal({
  termId,
  languageId,
  initialComments,
  commentCount,
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <MessageIcon />
          Comments ({commentCount})
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Comments</DrawerTitle>
        </DrawerHeader>
        <CommentsPanel
          termId={termId}
          languageId={languageId}
          initialComments={initialComments}
        />
      </DrawerContent>
    </Drawer>
  )
}

const MessageIcon = () => {
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
      class="lucide lucide-message-square-more"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
    </svg>
  )
}
