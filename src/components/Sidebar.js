// components/Sidebar.js
'use client'
import Link from 'next/link'

const terms = ['hello', 'world', 'example'] // Replace with actual terms or fetch from database

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <h2 className="text-2xl font-bold p-4">Terms</h2>
      <ul>
        {terms.map((term) => (
          <li key={term} className="p-4 hover:bg-gray-700">
            <Link legacyBehavior href={`/fr/${term}`}>
              <a>{term}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
