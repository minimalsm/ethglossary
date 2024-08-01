'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function AddCommentForm({ onAddComment }) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCommentSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onAddComment(newComment)
      setNewComment('')
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleCommentSubmit}
      className="relative mt-4 flex items-center"
    >
      <Textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Join the discussion..."
        className="flex min-h-[48px] w-full items-center justify-center rounded-md border p-2"
        disabled={isSubmitting}
      />
      <div className="absolute right-3 ml-2 flex h-full items-center justify-center">
        <button
          type="submit"
          className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white text-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? '...' : '↑'}
        </button>
      </div>
    </form>
  )
}
