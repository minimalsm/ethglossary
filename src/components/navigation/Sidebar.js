'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import CheckDecagramGreen from '@/components/icons/CheckDecagramGreen'
import CheckDecagramOutline from '@/components/icons/CheckDecagramOutline'
import Link from 'next/link'
import { slugify } from '@/utils/slugify'

export default function Sidebar({
  terms,
  className,
  languageCode,
  localeLanguageData,
  userHasTranslatedCount,
  termsLength,
}) {
  const pathname = usePathname()
  const space = '\u00a0'

  return (
    <div
      className={cn(
        'shrink-1 flex grow-0 basis-72 flex-col space-y-1 pb-12',
        className,
      )}
    >
      <div className="items-top flex justify-between">
        <p className="font-semibold">Terms</p>
        <div className="flex items-center text-sm">
          <span className="font-semibold">
            {localeLanguageData?.localName}:{' '}
          </span>
          <span>{space}</span>
          <span className="mr-1">
            {userHasTranslatedCount} / {termsLength}
          </span>
          <CheckDecagramGreen className="text-accent-green" />
        </div>
      </div>
      <hr className="mb-5 mt-3" />
      <div className="max-h-[calc(100vh-150px)] min-h-[300px] overflow-y-auto overflow-x-hidden md:max-h-[calc(100vh-200px)]">
        {terms.map(term => {
          const termPath = `/${languageCode}/${slugify(term.term)}`
          const isActive = pathname === termPath

          return (
            <TermButton
              key={term.term}
              term={term.term}
              termPath={termPath}
              isActive={isActive}
              hasTranslated={term.user_has_translated}
            />
          )
        })}
      </div>
    </div>
  )
}

const TermButton = ({ term, termPath, isActive, hasTranslated }) => {
  const termRef = useRef(null)

  useEffect(() => {
    if (isActive && termRef.current) {
      termRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', // scroll within the sidebar, not the whole page
      })
    }
  }, [isActive])

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'hover:bg-surface-hover w-full justify-start rounded-none bg-background px-3 py-2 hover:text-inherit',
        {
          'bg-surface-selected border-text-primary border-b font-semibold':
            isActive,
          'bg-translated hover:bg-translatedHover': hasTranslated,
          'border-b-accent-green bg-translatedActive':
            isActive && hasTranslated,
        },
      )}
      key={term}
    >
      <Link
        prefetch={true}
        href={termPath}
        className={cn('font-normal')}
        ref={termRef}
      >
        {hasTranslated ? (
          <CheckDecagramGreen className="mr-2 shrink-0 text-accent-green" />
        ) : (
          <CheckDecagramOutline className="mr-2 shrink-0" />
        )}
        <p className="text-wrap text-base">{term}</p>
      </Link>
    </Button>
  )
}
