// components/CommentsList.js
'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CommentsList({ translationId }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchComments = async () => {
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('*')
        .eq('translation_id', translationId)

      if (error) {
        console.error('Error fetching comments:', error)
      } else {
        setComments(commentsData)
      }
      setLoading(false)
    }

    fetchComments()
  }, [translationId, supabase])

  if (loading) {
    return <p>Loading comments...</p>
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="mb-2 p-2 border rounded-md">
            <p>{comment.comment}</p>
          </div>
        ))
      )}
    </div>
  )
}
