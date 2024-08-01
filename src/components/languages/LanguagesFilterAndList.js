'use client'

import { useState } from 'react'
import LanguagesFilter from '@/components/languages/LanguagesSearch'
import LanguagesList from '@/components/languages/LanguagesList'

const LanguagesFilterAndList = ({ languages }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = query => {
    console.log(query)
    setSearchQuery(query)
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

  return (
    <div>
      <LanguagesFilter onSearch={handleSearch} />
      <p className="mb-3 text-sm">
        Showing{' '}
        <span className="font-semibold">
          {numberFilteredLanguages} of {numberTotalLanguages}
        </span>{' '}
        languages
      </p>
      <LanguagesList languages={filteredLanguages} />
    </div>
  )
}

export default LanguagesFilterAndList
