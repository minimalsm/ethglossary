'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Card } from '@/components/ui/card'
import { voteOnComment, hasUserVoted } from '../../lib/comment_votes'

export default function CommentCard({ comment, userId }) {
  const [upvotes, setUpvotes] = useState(comment.upvotes || 0)
  const [downvotes, setDownvotes] = useState(comment.downvotes || 0)
  const [userVote, setUserVote] = useState(null)

  useEffect(() => {
    const loadVotes = async () => {
      if (userId) {
        const userVote = await hasUserVoted(userId, comment.id)
        setUserVote(userVote?.vote || null)
      }
    }

    loadVotes()
  }, [comment.id, userId])

  const handleVote = async vote => {
    if (!userId) {
      alert('You must be logged in to vote.')
      return
    }

    // Optimistically update the UI
    const previousUserVote = userVote
    const previousUpvotes = upvotes
    const previousDownvotes = downvotes

    if (vote === 1) {
      setUpvotes(prev => prev + 1)
      if (userVote === -1) {
        setDownvotes(prev => prev - 1)
      }
    } else if (vote === -1) {
      setDownvotes(prev => prev + 1)
      if (userVote === 1) {
        setUpvotes(prev => prev - 1)
      }
    }

    setUserVote(vote)

    try {
      await voteOnComment(userId, comment.id, vote)
    } catch (error) {
      console.error('Error voting on comment:', error)
      // Revert the state if the request fails
      setUserVote(previousUserVote)
      setUpvotes(previousUpvotes)
      setDownvotes(previousDownvotes)
    }
  }

  return (
    <Card className="w-full max-w-md p-4 grid gap-6">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={comment.profiles?.avatar_url} />
          <AvatarFallback>
            {comment.profiles?.display_name
              ? comment.profiles.display_name.charAt(0).toUpperCase()
              : 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium">
              {comment.profiles?.display_name || 'Anonymous'}
            </h4>
          </div>
          <p className="text-muted-foreground">{comment.comment}</p>
          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="ghost"
              size="icon"
              disabled={userVote === 1}
              className={`p-2 text-gray-700 hover:bg-gray-100 ${userVote === 1 ? 'text-green-500' : ''}`}
              onClick={() => handleVote(1)}
            >
              <ThumbsUpIcon className="w-4 h-4" />
              <span className="sr-only">Like</span>
            </Button>
            <span className="text-muted-foreground text-sm">{upvotes}</span>
            <Button
              variant="ghost"
              size="icon"
              disabled={userVote === -1}
              className={`p-2 text-gray-700 hover:bg-gray-100 ${userVote === -1 ? 'text-red-500' : ''}`}
              onClick={() => handleVote(-1)}
            >
              <ThumbsDownIcon className="w-4 h-4" />
              <span className="sr-only">Dislike</span>
            </Button>
            <span className="text-muted-foreground text-sm">{downvotes}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

function ThumbsDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  )
}

function ThumbsUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}
