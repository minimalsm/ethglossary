'use client'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

export default function Sidebar({ terms, className, languageCode }) {
  const pathname = usePathname()

  console.log(languageCode)

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 pt-4">
        <div className="px-3">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Terms
          </h2>
          <div className="space-y-1 flex flex-col min-w-52">
            {terms.map(term => {
              const termPath = `/${languageCode}/${term.term}`
              const isActive = pathname === termPath

              return (
                <Button
                  asChild
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn('w-full justify-start', {
                    'active-class': isActive,
                  })}
                  key={term.term}
                >
                  <a href={termPath}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check mr-2 h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {term.term}
                  </a>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
