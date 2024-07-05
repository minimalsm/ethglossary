'use client'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function VoteButtons({ translationId, initialVotes, userId }) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUserVote = async () => {
      if (userId) {
        const { data: userVoteData, error } = await supabase
          .from('votes')
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

  const handleVote = async (vote) => {
    if (!userId) {
      alert('You must be logged in to vote.')
      return
    }

    setLoading(true)

    try {
      const { data: existingVote, error: fetchError } = await supabase
        .from('votes')
        .select('id, vote')
        .eq('user_id', userId)
        .eq('translation_id', translationId)
        .maybeSingle() // Use maybeSingle to handle the case when no rows are returned

      if (fetchError) {
        throw fetchError
      }

      let newVotes = votes

      if (existingVote) {
        if (existingVote.vote === vote) {
          alert('You have already voted this way.')
          setLoading(false)
          return
        }

        const { error: updateError } = await supabase
          .from('votes')
          .update({ vote })
          .eq('id', existingVote.id)

        if (updateError) {
          throw updateError
        }

        newVotes += vote - existingVote.vote
      } else {
        const { error: insertError } = await supabase
          .from('votes')
          .insert({ user_id: userId, translation_id: translationId, vote })

        if (insertError) {
          throw insertError
        }

        newVotes += vote
      }

      setUserVote(vote)
      setVotes(newVotes)
    } catch (error) {
      alert(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => handleVote(1)}
        disabled={userVote === 1 || loading}
        className={`px-2 py-1 ${userVote === 1 ? 'bg-green-500' : 'bg-gray-300'}`}
      >
        Upvote
      </button>
      <span className="mx-2">{votes}</span>
      <button
        onClick={() => handleVote(-1)}
        disabled={userVote === -1 || loading}
        className={`px-2 py-1 ${userVote === -1 ? 'bg-red-500' : 'bg-gray-300'}`}
      >
        Downvote
      </button>
    </div>
  )
}
