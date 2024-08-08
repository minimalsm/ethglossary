'use client'
import { usePathname } from 'next/navigation'
import { ArrowUpAndRight } from '@/components/icons'

const LeaderboardBanner = ({ eventStatus }) => {
  const pathname = usePathname()
  const languagesPath = pathname.includes('/leaderboard')

  if (languagesPath) {
    return (
      <div className="flex items-center justify-center gap-1 bg-banner py-4 text-banner-foreground">
        <p className="text-center text-sm font-bold">
          {eventStatus}{' '}
          <a
            href="https://ethereum.org/en/contributing/translation-program/translatathon/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-primary"
          >
            Learn more <ArrowUpAndRight />
          </a>
        </p>
      </div>
    )
  }

  return null
}

export default LeaderboardBanner
