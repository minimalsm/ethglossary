import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export const createClient = request => {
  // Create an initial unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options = {}) {
          // Set default options for testing (relaxed security)
          const defaultOptions = {
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            path: '/',
            ...options,
          }
          // Update cookies on the request
          request.cookies.set({
            name,
            value,
            ...defaultOptions,
          })
          // Update the response to reflect the cookie changes
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...defaultOptions,
          })
        },
        remove(name, options = {}) {
          // Set default options for testing (relaxed security)
          const defaultOptions = {
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            path: '/',
            ...options,
          }
          // Update cookies on the request
          request.cookies.set({
            name,
            value: '',
            ...defaultOptions,
          })
          // Update the response to reflect the cookie changes
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...defaultOptions,
          })
        },
      },
    },
  )

  return { supabase, response }
}
