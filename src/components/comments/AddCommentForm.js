'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function CommentForm({ onAddComment }) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCommentSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    await onAddComment(newComment)
    setNewComment('')
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleCommentSubmit} className="mt-4">
      <Textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Leave a comment"
        className="w-full p-2 border rounded-md"
        disabled={isSubmitting}
      />
      <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Comment'}
      </Button>
    </form>
  )
}
