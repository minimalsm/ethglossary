'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import CheckDecagramGreen from '@/components/icons/CheckDecagramGreen'
import CheckDecagramOutline from '@/components/icons/CheckDecagramOutline'

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
  console.log('Terms length', termsLength)

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
          <CheckDecagramGreen />
        </div>
      </div>
      <hr className="mb-5 mt-3" />

      {terms.map(term => {
        const termPath = `/${languageCode}/${term.term}`
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
  )
}

const TermButton = ({ term, termPath, isActive, hasTranslated }) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full justify-start rounded-none bg-[#1C202F] px-3 hover:bg-[#3A3E50] hover:text-white',
        {
          'bg-[#282D3E] font-semibold': isActive,
          'bg-[#1B2E3A] hover:bg-[#184951]': hasTranslated,
          'bg-[#193C46]': isActive && hasTranslated,
        },
      )}
      key={term}
    >
      <a href={termPath} className={cn('flex gap-1 font-normal')}>
        {hasTranslated ? <CheckDecagramGreen /> : <CheckDecagramOutline />}
        <p className="text-base">{term}</p>
      </a>
    </Button>
  )
}
