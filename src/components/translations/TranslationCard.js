import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { voteOnTranslation } from '@/lib/translations'

export default function TranslationCard({ translation, userId, initialVotes }) {
  const [upvotes, setUpvotes] = useState(translation.upvotes)
  const [downvotes, setDownvotes] = useState(translation.downvotes)
  const [userVote, setUserVote] = useState(initialVotes)

  useEffect(() => {
    // Load user's vote if needed
  }, [translation.id, userId])

  const handleVote = async vote => {
    if (!userId) {
      alert('You must be logged in to vote.')
      return
    }

    // Optimistically update UI
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
      await voteOnTranslation(userId, translation.id, vote)
    } catch (error) {
      console.error('Error voting on translation:', error)
      // Revert optimistic update if there's an error
      setUserVote(previousUserVote)
      setUpvotes(previousUpvotes)
      setDownvotes(previousDownvotes)
    }
  }

  return (
    <div className="p-4 border rounded-md">
      <p>{translation.translation}</p>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleVote(1)}
          disabled={userVote === 1}
          // className={userVote === 1 ? 'text-green-500' : ''}
        >
          <ThumbsUpIcon className="size-4" />
        </Button>
        <span className="mx-2">{upvotes}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleVote(-1)}
          disabled={userVote === -1}
          className={userVote === -1 ? 'text-red-500' : ''}
        >
          <ThumbsDownIcon className="w-4 h-4" />
        </Button>
        <span className="mx-2">{downvotes}</span>
      </div>
      <div className="text-sm text-gray-500 bg-[#E3E3E3] px-2 py-1">
        Suggested by {translation.display_name || 'Anonymous'}
      </div>
    </div>
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
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="F7E544"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.25 7.50012C17.25 6.66762 16.575 6.00012 15.75 6.00012H11.01L11.73 2.57262C11.745 2.49762 11.7525 2.41512 11.7525 2.33262C11.7525 2.02512 11.625 1.74012 11.4225 1.53762L10.6275 0.750122L5.6925 5.68512C5.415 5.96262 5.25 6.33762 5.25 6.75012V14.2501C5.25 14.6479 5.40804 15.0295 5.68934 15.3108C5.97064 15.5921 6.35218 15.7501 6.75 15.7501H13.5C14.1225 15.7501 14.655 15.3751 14.88 14.8351L17.145 9.54762C17.2125 9.37512 17.25 9.19512 17.25 9.00012V7.50012ZM0.75 15.7501H3.75V6.75012H0.75V15.7501Z"
        fill="#F7E544"
      />
    </svg>
  )
}

function ThumbsUpIcon2({ className, fill = 'green', ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="green"
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
