// components/AddTranslation.js
'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AddTranslation({ termId }) {
  const [translation, setTranslation] = useState('')
  const supabase = createClientComponentClient()
  console.log('AddTranslation, termid:', termId)

  const handleAddTranslation = async (e) => {
    e.preventDefault()
    console.log('adding translation')
    const { data, error } = await supabase
      .from('translations')
      .insert([{ term_id: termId, translation }])
    if (error) {
      alert(error.message)
      console.log(error)
    } else {
      console.log(data)
    }
  }

  return (
    <form onSubmit={handleAddTranslation} className="space-y-4">
      <input
        type="text"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        placeholder="Translation"
        className="w-full px-4 py-2 border rounded-md text-black"
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
        Submit Translation
      </button>
    </form>
  )
}
