'use client'
import { Input } from '@/components/ui/input'

export default function LanguagesSearch({ onSearch }) {
  const handleInputChange = e => {
    onSearch(e.target.value)
  }

  return (
    <form className="relative my-6 w-full">
      <MagnifyIcon className="absolute right-2.5 top-2.5" />
      <Input
        type="search"
        placeholder="Search by language or country"
        onChange={handleInputChange}
        className="rounded-full border-border px-4 py-3 text-base placeholder:text-text-tertiary"
      />
    </form>
  )
}

const MagnifyIcon = ({ className = '' }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.91667 2.50244C9.35326 2.50244 10.731 3.07312 11.7468 4.08895C12.7627 5.10477 13.3333 6.48252 13.3333 7.91911C13.3333 9.26077 12.8417 10.4941 12.0333 11.4441L12.2583 11.6691H12.9167L17.0833 15.8358L15.8333 17.0858L11.6667 12.9191V12.2608L11.4417 12.0358C10.4917 12.8441 9.25833 13.3358 7.91667 13.3358C6.48008 13.3358 5.10233 12.7651 4.0865 11.7493C3.07068 10.7334 2.5 9.3557 2.5 7.91911C2.5 6.48252 3.07068 5.10477 4.0865 4.08895C5.10233 3.07312 6.48008 2.50244 7.91667 2.50244ZM7.91667 4.16911C5.83333 4.16911 4.16667 5.83577 4.16667 7.91911C4.16667 10.0024 5.83333 11.6691 7.91667 11.6691C10 11.6691 11.6667 10.0024 11.6667 7.91911C11.6667 5.83577 10 4.16911 7.91667 4.16911Z"
        fill="currentColor"
      />
    </svg>
  )
}
