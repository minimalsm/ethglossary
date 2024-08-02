'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { voteOnComment, hasUserVoted } from '@/lib/comment_votes'
import { formatDistanceToNow } from 'date-fns'

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
    <Card className="grid w-full gap-2 border-none bg-background shadow-none md:max-w-xs">
      <div id="card-header" className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.profiles?.avatar_url} />
          <AvatarFallback>
            {comment.profiles?.display_name
              ? comment.profiles.display_name.charAt(0).toUpperCase()
              : 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-bold">
            {comment.profiles?.display_name || 'Anonymous'}
          </span>
          {/* Todo: extract this out and refactor lazy approach */}
          <span className="text-text-tertiary text-xs">
            {formatDistanceToNow(new Date(comment.created_at || Date.now()), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
      <div id="card-body">
        <p className="break-all text-sm">{comment.comment}</p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="m-1 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={userVote === 1}
            className={`text-gray-700 hover:bg-gray-100 ${userVote === 1 ? 'text-green-500' : ''} h-auto w-auto`}
            onClick={() => handleVote(1)}
          >
            <ThumbsUpIcon className="h-4 w-4" />
            <span className="sr-only">Like</span>
          </Button>
          <span className="text-sm text-muted-foreground">{upvotes}</span>
        </div>

        <div className="m-1 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={userVote === -1}
            className={`text-gray-700 hover:bg-gray-100 ${userVote === -1 ? 'text-red-500' : ''} h-auto w-auto`}
            onClick={() => handleVote(-1)}
          >
            <ThumbsDownIcon className="h-4 w-4" />
            <span className="sr-only">Dislike</span>
          </Button>
          <span className="text-sm text-muted-foreground">{downvotes}</span>
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
