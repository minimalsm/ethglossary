'use client'
import { useState } from 'react'
import AddCommentForm from '@/components/comments/AddCommentForm'
import CommentCard from '@/components/comments/CommentCard'
import { addComment } from '@/lib/comments'
import { fetchUserMetadata } from '@/lib/userProfile'
import { ScrollArea } from '@/components/ui/scroll-area'

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
    <div className="grow-1 mt-6 flex shrink-0 flex-col gap-4">
      <h2 className="text-base font-semibold">Comments ({commentCount})</h2>
      {/* Todo: add a more elegant solution here */}
      <ScrollArea className="max-h-[calc(100vh-300px)] min-h-[300px]">
        <div className="flex flex-col space-y-4">
          {comments.map(comment => (
            <>
              <hr />
              <CommentCard
                comment={comment}
                key={comment.id}
                userId={user?.id}
              />
            </>
          ))}
        </div>
      </ScrollArea>
      <AddCommentForm onAddComment={handleAddComment} />
    </div>
  )
}
