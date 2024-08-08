'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Define the Zod schema for validation
const commentSchema = z.object({
  newComment: z.string().min(5, { message: 'Comment cannot be empty' }),
})

export default function AddCommentForm({ onAddComment }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(commentSchema),
  })

  const handleCommentSubmit = async data => {
    setIsSubmitting(true)
    try {
      await onAddComment(data.newComment)
      reset()
    } catch (error) {
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCommentSubmit)}
        className="relative flex items-center"
      >
        <Input
          {...register('newComment')}
          placeholder="Join the discussion..."
          className={`min-h-[48px] rounded-full border-border pr-12 text-base placeholder:text-foreground ${
            errors.newComment ? 'border-destructive' : ''
          }`}
          disabled={isSubmitting}
        />
        <div className="absolute right-3 ml-2 flex h-full items-center justify-center">
          <Button
            type="submit"
            size="icon"
            className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary text-black"
            disabled={isSubmitting || !isValid}
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
      {errors.newComment && (
        <span className="ml-3 mt-1 text-sm text-destructive">
          {errors.newComment.message}
        </span>
      )}
    </>
  )
}
