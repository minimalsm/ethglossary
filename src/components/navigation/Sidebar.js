'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function Sidebar({ terms, className, languageCode }) {
  const pathname = usePathname()

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 pt-6 ">
        <div className="max-w-72 w-72">
          <div className="flex items-top justify-between">
            <p className="font-semibold">Terms</p>
            <div className="flex items-center text-sm">
              <span className="font-semibold">Français: </span>
              <span> </span>
              <span className="mr-1">4 / 50</span>
              <CheckDecagramGreen />
            </div>
          </div>
          <hr className="mt-3 mb-5" />
          <div className="space-y-1 flex flex-col w-full">
            {terms.map(term => {
              const termPath = `/${languageCode}/${term.term}`
              const isActive = pathname === termPath

              return (
                <Button
                  asChild
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn('w-full justify-start px-3 rounded-none', {
                    'active-class': isActive,
                  })}
                  key={term.term}
                >
                  <a
                    href={termPath}
                    className={cn(
                      'flex gap-1 font-normal',
                      term.user_has_translated ? 'bg-primaryTheme' : 'bg-white',
                    )}
                  >
                    <TermItem
                      user_has_translated={term.user_has_translated}
                      term={term.term}
                    />
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

const TermItem = ({ user_has_translated, term }) => {
  if (user_has_translated) {
    return (
      <>
        <CheckDecagramGreen />
        <div className="text-base">{term}</div>
      </>
    )
  }

  return (
    <>
      <CheckDecagramOutline />
      <div className="text-base">{term}</div>
    </>
  )
}

const CheckDecagramOutline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#B7B7B7"
      d="m23 12l-2.4-2.8l.3-3.7l-3.6-.8l-1.9-3.2L12 3L8.6 1.5L6.7 4.7l-3.6.8l.3 3.7L1 12l2.4 2.8l-.3 3.7l3.6.8l1.9 3.2L12 21l3.4 1.5l1.9-3.2l3.6-.8l-.3-3.7zm-4.3 4.9l-2.7.6l-1.4 2.4l-2.6-1.1l-2.6 1.1L8 17.5l-2.7-.6l.2-2.8L3.7 12l1.8-2.1l-.2-2.8L8 6.5l1.4-2.4L12 5.2l2.6-1.1L16 6.5l2.7.6l-.2 2.8l1.8 2.1l-1.8 2.1zm-2.1-9.3L18 9l-8 8l-4-4l1.4-1.4l2.6 2.6z"
    />
  </svg>
)

const CheckDecagramGreen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#08532F"
      d="m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68zm-13 5l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z"
    />
  </svg>
)
