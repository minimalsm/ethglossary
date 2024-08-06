'use client'
import { useState } from 'react'
import AddCommentForm from '@/components/comments/AddCommentForm'
import CommentCard from '@/components/comments/CommentCard'
import { addComment } from '@/lib/comments'
import { fetchUserMetadata } from '@/lib/userProfile'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function CommentsPanel({
  initialComments,
  termId,
  languageId,
  user,
  commentCount,
}) {
  const [comments, setComments] = useState(initialComments || [])

  const handleAddComment = async commentText => {
    if (!user) {
      alert('You must be logged in to comment.')
      return
    }

    // Optimistically update the UI
    const optimisticComment = {
      id: Date.now(), // Temporary ID
      key: Date.now(),
      term_id: termId,
      language_id: languageId,
      user_id: user.id,
      comment: commentText,
      upvotes: 0,
      downvotes: 0,
      profiles: {
        display_name: user.display_name,
        avatar_url: user.user_metadata?.avatar_url || user.avatar_url,
      },
    }
    setComments(prevComments => [...prevComments, optimisticComment])

    try {
      const newComment = await addComment(
        termId,
        languageId,
        user.id,
        commentText,
      )

      const userMetadata = await fetchUserMetadata(newComment.user_id)

      const newCommentData = {
        ...newComment,
        profiles: userMetadata,
      }

      // Replace temporary comment with actual comment from the server
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === optimisticComment.id ? newCommentData : comment,
        ),
      )
    } catch (error) {
      console.error('Error adding comment:', error)
      // Revert optimistic update if there's an error
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== optimisticComment.id),
      )
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className="hidden font-sans text-base font-semibold md:block">
        Comments ({commentCount})
      </h2>
      <Separator className="mb-4 mt-3" />
      <div className="max-h-[calc(100vh-230px)] min-h-[120px] overflow-y-auto overflow-x-hidden">
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={comment.id}>
                <CommentCard comment={comment} userId={user?.id} />
                {/* Only render the separator if it's not the last item */}
                {index < comments.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        ) : (
          <EmptyComments />
        )}
      </div>
      <Separator className="mb-4" />
      <AddCommentForm onAddComment={handleAddComment} />
    </div>
  )
}

const EmptyComments = () => (
  <div className="mx-4 my-16 flex flex-col items-center gap-2 text-center">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-2"
    >
      <path
        d="M11.9993 29.3333C11.6457 29.3333 11.3066 29.1928 11.0565 28.9428C10.8065 28.6927 10.666 28.3536 10.666 28V24H5.33268C4.62544 24 3.94716 23.719 3.44706 23.2189C2.94697 22.7188 2.66602 22.0405 2.66602 21.3333V5.33329C2.66602 3.85329 3.86602 2.66663 5.33268 2.66663H26.666C27.3733 2.66663 28.0515 2.94758 28.5516 3.44767C29.0517 3.94777 29.3327 4.62605 29.3327 5.33329V21.3333C29.3327 22.0405 29.0517 22.7188 28.5516 23.2189C28.0515 23.719 27.3733 24 26.666 24H18.5327L13.5993 28.9466C13.3327 29.2 12.9993 29.3333 12.666 29.3333H11.9993ZM13.3327 21.3333V25.44L17.4393 21.3333H26.666V5.33329H5.33268V21.3333H13.3327Z"
        fill="currentColor"
      />
    </svg>
    <p className="font-bold">Start the conversation</p>
    <p>Describe why you chose your suggested translation for others</p>
  </div>
)
