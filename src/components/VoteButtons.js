// components/VoteButtons.js
'use client'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function VoteButtons({ translationId, initialVotes, userId }) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUserVote = async () => {
      if (userId) {
        const { data: userVoteData, error } = await supabase
          .from('votes')
          .select('vote')
          .eq('user_id', userId)
          .eq('translation_id', translationId)
          .single()

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

    const { data, error } = await supabase
      .from('votes')
      .upsert({ user_id: userId, translation_id: translationId, vote })
      .select()

    if (error) {
      alert(error.message)
    } else {
      setUserVote(vote)
      setVotes((prevVotes) => prevVotes + (vote - (userVote || 0)))
    }
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => handleVote(1)}
        disabled={userVote === 1}
        className={`px-2 py-1 ${userVote === 1 ? 'bg-green-500' : 'bg-gray-300'}`}
      >
        Upvote
      </button>
      <span className="mx-2">{votes}</span>
      <button
        onClick={() => handleVote(-1)}
        disabled={userVote === -1}
        className={`px-2 py-1 ${userVote === -1 ? 'bg-red-500' : 'bg-gray-300'}`}
      >
        Downvote
      </button>
    </div>
  )
}
