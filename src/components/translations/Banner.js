'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Close } from '@/components/icons'
import { POINTS_PER_TERM } from '@/lib/constants'

const Banner = ({ translatedTerms, initialDismissed, totalTerms }) => {
  const [isDismissed, setIsDismissed] = useState(initialDismissed)
  const router = useRouter()

  let bannerKey = ''
  let bannerText = ''
  let bannerTitle = ''
  let bannerClass = ''

  if (translatedTerms >= 0 && translatedTerms < 30) {
    bannerKey = 'bannerDismissed-0-29'
    bannerTitle = 'How to earn rewards'
    bannerText = (
      <>
        Earn <strong>{POINTS_PER_TERM} points for each translated term</strong>{' '}
        you translate. Translate{' '}
        <strong>
          all {totalTerms} terms for {totalTerms * POINTS_PER_TERM * 2} points
        </strong>{' '}
        🎉
      </>
    )
    bannerClass = 'bg-[#E7EDFF]'
  } else if (translatedTerms >= 30 && translatedTerms < 60) {
    bannerKey = 'bannerDismissed-30-59'
    bannerTitle = 'Congratulations!'
    bannerText = (
      <>
        <strong>You&apos;ve earned 300 points for translating 30 terms</strong>.
        Translate all {totalTerms} terms for <strong>1000 points</strong> 🎉
      </>
    )
    bannerClass = 'bg-[#BFF5DB]'
  } else if (translatedTerms >= 60 && translatedTerms < totalTerms) {
    bannerKey = `bannerDismissed-60-${totalTerms - 1}`
    bannerTitle = 'Congratulations!'
    bannerText = (
      <>
        <strong>You&apos;ve earned 600 points for translating 60 terms</strong>.
        Translate the last {totalTerms - 60} for <strong>1000 points</strong> 🎉
      </>
    )
    bannerClass = 'bg-[#BFF5DB]'
  } else if (translatedTerms === totalTerms) {
    bannerKey = `bannerDismissed-${totalTerms}`
    bannerTitle = `You translated all ${totalTerms} terms 👏`
    bannerClass = 'bg-[#BFF5DB]'
    bannerText = (
      <>
        <strong>Thank you</strong> ❤️ You&apos;ve earned the maximum of{' '}
        <strong>1000 points</strong> towards your total Translatathon score!
      </>
    )
  }

  const handleDismiss = () => {
    document.cookie = `${bannerKey}=true; path=/; max-age=${30 * 24 * 60 * 60}` // Set the cookie for 30 days
    setIsDismissed(true)
    router.refresh() // Refresh the page to reflect the cookie state
  }

  if (isDismissed) return null

  return (
    <Alert
      className={`flex w-full items-center justify-between rounded border-none px-4 py-3 text-black ${bannerClass} md:mb-10`}
    >
      <div className="">
        <AlertTitle className="mb-0 text-sm font-bold">
          {bannerTitle}
        </AlertTitle>
        <AlertDescription className="text-xs">{bannerText}</AlertDescription>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDismiss}
        className="basis-10 rounded-sm font-bold text-black hover:border-2 hover:bg-transparent"
      >
        <Close width={20} height={20} />
      </Button>
    </Alert>
  )
}

export default Banner
