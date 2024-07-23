'use client'
import { useState } from 'react'
import AddCommentForm from '@/components/comments/AddCommentForm'
import CommentCard from '@/components/comments/CommentCard'
import { addComment } from '@/lib/comments'

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
      term_id: termId,
      language_id: languageId,
      user_id: user.id,
      comment: commentText,
      upvotes: 0,
      downvotes: 0,
      profiles: {
        display_name: user.user_metadata.name,
        avatar_url: user.user_metadata.avatar_url,
      },
    }
    setComments(prevComments => [...prevComments, optimisticComment])

    try {
      const newCommentData = await addComment(
        termId,
        languageId,
        user.id,
        commentText,
      )
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
    <div className="mt-6 flex flex-col gap-4 w-72 grow-0 shrink-1 basis-72">
      <h2 className="text-base font-semibold">Comments ({commentCount})</h2>
      <div className="space-y-4">
        {comments.map(comment => (
          <>
            <hr />
            <CommentCard comment={comment} key={comment.id} userId={user?.id} />
          </>
        ))}
      </div>
      <AddCommentForm onAddComment={handleAddComment} />
    </div>
  )
}
