'use client'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAuth } from '../app/context/AuthContext'

export default function CommentsSidebar({ termId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const { user } = useAuth()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('sidebarcomments')
        .select('*')
        .eq('term_id', termId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching comments:', error)
      } else {
        setComments(data)
      }
    }

    fetchComments()
  }, [termId, supabase])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('You must be logged in to comment.')
      return
    }

    console.log(user)

    const { data, error } = await supabase
      .from('sidebarcomments')
      .insert([{ term_id: termId, user_id: user.id, comment: newComment }])
      .select() // Ensure that the inserted data is returned

    if (error) {
      console.error('Error adding comment:', error)
    } else {
      if (data && data.length > 0) {
        setComments((prevComments) => [...prevComments, data[0]])
        setNewComment('')
      } else {
        console.error('No data returned from insert operation')
      }
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-md">
            <p>{comment.comment}</p>
            <p className="text-sm text-gray-500">- {comment.user_id}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment"
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Comment
        </button>
      </form>
    </div>
  )
}
