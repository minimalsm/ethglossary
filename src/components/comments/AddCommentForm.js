'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '../ui/input'

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
    <form onSubmit={handleCommentSubmit} className="relative flex items-center">
      <Input
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Join the discussion..."
        className="min-h-[48px] rounded-full border-border pr-12 text-base placeholder:text-foreground"
        disabled={isSubmitting}
      />
      <div className="absolute right-3 ml-2 flex h-full items-center justify-center">
        <Button
          type="submit"
          size="icon"
          className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary text-black"
          disabled={isSubmitting}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75758 12H5.24242V2.90909L1.07576 7.07576L0 6L6 0L12 6L10.9242 7.07576L6.75758 2.90909V12Z"
              fill="#1C202F"
            />
          </svg>
        </Button>
      </div>
    </form>
  )
}
