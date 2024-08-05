'use client'

import { useState } from 'react'
import LanguagesFilter from '@/components/languages/LanguagesSearch'
import LanguagesList from '@/components/languages/LanguagesList'
import { Button } from '@/components/ui/button'

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

  const numberFilteredLanguages = filteredLanguages.length
  const numberTotalLanguages = languages.length

  const displayedLanguages =
    showAll || searchQuery ? filteredLanguages : filteredLanguages.slice(0, 10)

  return (
    <div>
      <LanguagesFilter onSearch={handleSearch} />
      <p className="mb-3 text-sm">
        Showing{' '}
        <span className="font-semibold">
          {displayedLanguages.length} of {numberTotalLanguages}
        </span>{' '}
        languages
      </p>
      <LanguagesList languages={displayedLanguages} />
      {!showAll &&
        !searchQuery &&
        displayedLanguages.length < numberFilteredLanguages && (
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
    </div>
  )
}

export default LanguagesFilterAndList
