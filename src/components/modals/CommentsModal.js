import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import CommentsPanel from '@/components/comments/CommentsPanel'
import { Close } from '@/components/icons'

export default function CommentsModal({
  termId,
  languageId,
  initialComments,
  commentCount,
  user,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-1 rounded-none px-5 text-[14px] leading-none"
        >
          <MessageIcon width={20} height={20} /> Comments{' '}
          <span className="font-normal">({commentCount})</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="" side="bottom">
        <SheetHeader>
          <SheetTitle className="text-left font-sans text-xl">
            Comments ({commentCount})
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
        <CommentsPanel
          termId={termId}
          languageId={languageId}
          initialComments={initialComments}
          user={user}
        />
      </SheetContent>
    </Sheet>
  )
}

const MessageIcon = ({ width = 24, height = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="lucide lucide-message-square-more"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
    </svg>
  )
}
