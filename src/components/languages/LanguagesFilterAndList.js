'use client'

import { useState } from 'react'
import LanguagesFilter from '@/components/languages/LanguagesSearch'
import LanguagesList from '@/components/languages/LanguagesList'
import { Button } from '@/components/ui/button'
import { SearchNotFound } from '@/components/icons'
import { Link } from 'next/link'

const LanguagesFilterAndList = ({ languages }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const handleSearch = query => {
    setSearchQuery(query)
    setShowAll(false)
  }

  const filteredLanguages = languages.filter(
    language =>
      language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language.countries &&
        language.countries.some(country =>
          country.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  )

  const displayedLanguages =
    showAll || searchQuery ? filteredLanguages : filteredLanguages.slice(0, 10)

  const showLoadMoreButton =
    !showAll &&
    !searchQuery &&
    displayedLanguages.length < filteredLanguages.length

  return (
    <div>
      <LanguagesFilter onSearch={handleSearch} />

      <p className="mb-3 text-sm">
        Showing{' '}
        <span className="font-semibold">
          {displayedLanguages.length} of {languages.length}
        </span>{' '}
        languages
      </p>
      {filteredLanguages.length > 0 ? (
        <>
          <LanguagesList languages={displayedLanguages} />
          {showLoadMoreButton && (
            <div className="mt-6 flex items-center">
              <Button
                variant="outline"
                className="mx-auto"
                onClick={() => setShowAll(true)}
              >
                Load more
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-surface-extra flex flex-col items-center gap-2 rounded-[8px] px-4 py-8 text-center">
          <SearchNotFound className="mb-4" />
          <p className="font-bold">No results found</p>
          <p>
            Please refine your search and try again.
            <br /> If you don’t see your language listed,{' '}
            <a
              className="text-text-link font-bold"
              href={`mailto:website@ethereum.org`}
            >
              contact us
            </a>{' '}
            and let us know.
          </p>
        </div>
      )}
    </div>
  )
}

export default LanguagesFilterAndList
