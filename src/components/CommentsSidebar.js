'use client'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAuth } from '../context/AuthContext'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

export default function CommentsSidebar({ termId, languageId }) {
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
        .eq('language_id', languageId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching comments:', error)
      } else {
        setComments(data)
      }
    }

    fetchComments()
  }, [termId, languageId, supabase])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('You must be logged in to comment.')
      return
    }

    console.log(user)

    const { data, error } = await supabase
      .from('sidebarcomments')
      .insert([{ term_id: termId, language_id: languageId, user_id: user.id, comment: newComment }])
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
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment"
          className="w-full p-2 border rounded-md"
        />
        <Button
          type="submit"
          className="mt-2 w-full"
        >
          Comment
        </Button>
      </form>
    </div>
  )
}

// const Comment = ({ comment }) => {
//   return (
//     <div className="mb-4 p-4 border rounded bg-gray-50 flex flex-col md:flex-row items-start gap-4">
//       <Avatar className="flex-shrink-0">
//         <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
//         <AvatarFallback>JD</AvatarFallback>
//       </Avatar>
//       <div className="flex-1 w-full">
//         <p className="text-gray-800">{comment.comment}</p>
//         <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 text-sm text-gray-600">
//           <span className="font-semibold">Joshua</span>
//           <div className="flex items-center space-x-4 mt-2 md:mt-0">
//             <div className="flex items-center space-x-2">
//               <Button variant="ghost" size="icon" className="p-2 text-gray-700 hover:bg-gray-100">
//                 <ThumbsUpIcon className="h-4 w-4" />
//                 <span className="sr-only">Upvote</span>
//               </Button>
//               <span className="text-gray-500 m-0">12</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button variant="ghost" size="icon" className="p-2 text-gray-700 hover:bg-gray-100">
//                 <ThumbsDownIcon className="h-4 w-4" />
//                 <span className="sr-only">Downvote</span>
//               </Button>
//               <span className="text-gray-500 m-0">4</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// function ThumbsDownIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M17 14V2" />
//       <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
//     </svg>
//   )
// }


// function ThumbsUpIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M7 10v12" />
//       <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
//     </svg>
//   )
// }

import { Card } from "@/components/ui/card"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"

export function Comment({ comment}) {
  return (
    <Card className="w-full max-w-md p-4 grid gap-6">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium">Joshua</h4>
          </div>
          <p className="text-muted-foreground">
            {comment.comment}
          </p>
          <div className="flex items-center gap-2 justify-end">
          <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted"
              // className={`${
              //   userVote === "downvoted" ? "text-red-500 hover:bg-red-100" : "text-muted-foreground hover:bg-muted"
              // }`}
              // onClick={handleDownvote}
            >
              <ThumbsUpIcon className="w-4 h-4" />
              <span className="sr-only">Like</span>
            </Button>
            <span className="text-muted-foreground text-sm">10</span>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted">
              <ThumbsDownIcon className="w-4 h-4" />
              <span className="sr-only">Dislike</span>
            </Button>
            <span className="text-muted-foreground text-sm">5</span>
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