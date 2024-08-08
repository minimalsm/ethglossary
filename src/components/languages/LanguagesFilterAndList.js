'use client'

import { useState, useEffect } from 'react'
import LanguagesFilter from '@/components/languages/LanguagesSearch'
import LanguagesList from '@/components/languages/LanguagesList'
import { Button } from '@/components/ui/button'
import { SearchNotFound } from '@/components/icons'
import { Link } from 'next/link'

const LanguagesFilterAndList = ({ languages = [] }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    console.log('LanguagesFilterAndList mounted with languages:', languages)
  }, [languages])

  const handleSearch = query => {
    console.log('Search query updated:', query)
    setSearchQuery(query)
    setShowAll(false)
  }

  const filteredLanguages = languages.filter(language => {
    if (!language) return false
    const lowerCaseQuery = searchQuery.toLowerCase()
    const languageName = language.name?.toLowerCase()
    const localName = language.localName?.toLowerCase()
    const countries = language.countries?.map(country => country?.toLowerCase())

    return (
      languageName?.includes(lowerCaseQuery) ||
      localName?.includes(lowerCaseQuery) ||
      (countries &&
        countries.some(country => country?.includes(lowerCaseQuery)))
    )
  })

  console.log('Filtered languages based on query:', filteredLanguages)

  const displayedLanguages =
    showAll || searchQuery ? filteredLanguages : filteredLanguages.slice(0, 10)

  const showLoadMoreButton =
    !showAll &&
    !searchQuery &&
    displayedLanguages.length < filteredLanguages.length

  console.log('Displaying languages:', displayedLanguages)

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
