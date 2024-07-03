// app/page.js
'use client'
import Link from 'next/link'
import { useAuth } from './context/AuthContext'
// import Search from '../components/Search'

export default function HomePage() {
  const { user } = useAuth()
  const terms = ['hello', 'world', 'example'] // Replace with actual terms or fetch from database

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
            <p className="mt-4">You are logged in as {user.email}</p>
            {/* <Search /> */}
            {/* <div className="mt-4">
              {terms.map((term) => (
                <Link legacyBehavior key={term} href={`/fr/${term}`}>
                  <a className="block mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">{term}</a>
                </Link>
              ))}
            </div> */}
          </>
        ) : (
          <h1 className="text-2xl font-bold">Welcome to the Translation App</h1>
        )}
      </div>
    </div>
  )
}
