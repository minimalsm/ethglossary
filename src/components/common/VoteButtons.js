'use client'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import ThumbsUp from '@/components/icons/ThumbsUp'
import ThumbsDown from '@/components/icons/ThumbsDown'
import {
  ThumbUpFilled,
  ThumbUpOutline,
  ThumbDownOutline,
  ThumbDownFilled,
} from '@/components/icons/'
import { cn } from '@/lib/utils'

export default function VoteButtons({ translationId, initialVotes, userId }) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUserVote = async () => {
      if (userId) {
        const { data: userVoteData, error } = await supabase
          .from('translation_votes')
          .select('vote')
          .eq('user_id', userId)
          .eq('translation_id', translationId)
          .maybeSingle() // Use maybeSingle to handle the case when no rows are returned

        if (!error && userVoteData) {
          setUserVote(userVoteData.vote)
        }
      }
    }

    fetchUserVote()
  }, [translationId, userId, supabase])

  useEffect(() => {
    setVotes(initialVotes)
  }, [initialVotes])

  const handleVote = async vote => {
    if (!userId) {
      alert('You must be logged in to vote.')
      return
    }

    setLoading(true)

    try {
      const { data: existingVote, error: fetchError } = await supabase
        .from('translation_votes')
        .select('id, vote')
        .eq('user_id', userId)
        .eq('translation_id', translationId)
        .maybeSingle() // Use maybeSingle to handle the case when no rows are returned

      if (fetchError) {
        throw fetchError
      }

      if (existingVote) {
        if (existingVote.vote === vote) {
          alert('You have already voted this way.')
          setLoading(false)
          return
        }

        const { error: updateError } = await supabase
          .from('translation_votes')
          .update({ vote })
          .eq('id', existingVote.id)

        if (updateError) {
          throw updateError
        }

        if (vote === 1) {
          setVotes(prev => ({ ...prev, upvotes: prev.upvotes + 1 }))
          if (existingVote.vote === -1) {
            setVotes(prev => ({ ...prev, downvotes: prev.downvotes - 1 }))
          }
        } else {
          setVotes(prev => ({ ...prev, downvotes: prev.downvotes + 1 }))
          if (existingVote.vote === 1) {
            setVotes(prev => ({ ...prev, upvotes: prev.upvotes - 1 }))
          }
        }
      } else {
        const { error: insertError } = await supabase
          .from('translation_votes')
          .insert({ user_id: userId, translation_id: translationId, vote })

        if (insertError) {
          throw insertError
        }

        if (vote === 1) {
          setVotes(prev => ({ ...prev, upvotes: prev.upvotes + 1 }))
        } else {
          setVotes(prev => ({ ...prev, downvotes: prev.downvotes + 1 }))
        }
      }

      setUserVote(vote)
    } catch (error) {
      alert(error.message)
    }

    setLoading(false)
  }

  return (
    <section className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        disabled={userVote === 1}
        className={`text-foreground hover:bg-inherit hover:text-primary disabled:opacity-100 ${userVote === 1 ? 'text-accent-vote' : ''} h-auto`}
        onClick={() => handleVote(1)}
      >
        {userVote === 1 ? (
          <ThumbUpFilled width={16} height={16} />
        ) : (
          <ThumbUpOutline width={16} height={16} />
        )}
        <span
          className={cn(
            'ml-0.5 text-sm text-muted-foreground',
            userVote === 1 ? 'text-accent-vote' : '',
          )}
        >
          {votes?.upvotes || 0}
        </span>
        <span className="sr-only">Like</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled={userVote === -1}
        className={`text-foreground hover:bg-inherit hover:text-primary disabled:opacity-100 ${userVote === -1 ? 'text-accent-vote' : ''} h-auto`}
        onClick={() => handleVote(-1)}
      >
        {userVote === -1 ? (
          <ThumbDownFilled width={16} height={16} />
        ) : (
          <ThumbDownOutline width={16} height={16} />
        )}
        {/* <ThumbsDown
          className="h-4 w-4"
          fill={userVote === -1 ? '#F7E544' : 'none'}
        /> */}
        <span
          className={cn(
            'ml-0.5 text-sm text-muted-foreground',
            userVote === -1 ? 'text-accent-vote' : '',
          )}
        >
          {votes?.downvotes || 0}
        </span>
        <span className="sr-only">Dislike</span>
      </Button>
    </section>
  )
}
