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

//   <div className="flex space-x-2">
//                 <button className="p-1 text-gray-700">
//                   <ThumbsUpIcon className="h-4 w-4" />
//                 </button>
//                 <button className="p-1 text-gray-700">
//                   <ThumbsDownIcon className="h-4 w-4" />
//                 </button>
//               </div>

  return (
    <div className="flex items-center">
      <button
        onClick={() => handleVote(1)}
        disabled={userVote === 1 || loading}
        className={`p-1 text-gray-700 ${userVote === 1 ? '' : ''}`}
      >
        <ThumbsUpIcon 
          className="h-4 w-4"
          fill={`${userVote === 1 ? 'green' : 'none'}`}
        />
      </button>
      <span className="mx-2">{votes}</span>
      <button
        onClick={() => handleVote(-1)}
        disabled={userVote === -1 || loading}
        className={`p-1 text-gray-700 ${userVote === -1 ? '' : ''}`}
      >
        <ThumbsDownIcon 
          className="h-4 w-4"
          fill={`${userVote === -1 ? 'red' : 'none'}`}
          stroke={`${userVote === -1 ? 'currentColor' : 'currentColor'}`}
        />
      </button>
    </div>
  )
}

function ThumbsDownIcon(props) {
    const { fill, stroke, ...rest } = props;

    return (
      <svg
        {...rest}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
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
    const { fill, ...rest } = props; // Destructure the fill prop

    return (
      <svg
        {...rest}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={fill}
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
