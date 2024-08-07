'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Close } from '@/components/icons'

const Banner = ({ completionPercentage, initialDismissed }) => {
  const [isDismissed, setIsDismissed] = useState(initialDismissed)
  const router = useRouter()

  let bannerKey = ''
  let bannerText = ''
  let bannerTitle = ''
  let bannerClass = ''

  if (completionPercentage >= 0 && completionPercentage < 50) {
    bannerKey = 'bannerDismissed-0-49'
    bannerTitle = 'How to earn rewards'
    bannerText = (
      <>
        Translate 50% of terms in a language to earn a{' '}
        <strong>1.1x multiplier</strong>. Translate 100% to earn a{' '}
        <strong>1.2x multiplier</strong> 🎉
      </>
    )
    bannerClass = 'bg-[#E7EDFF]'
  } else if (completionPercentage >= 50 && completionPercentage < 100) {
    bannerKey = 'bannerDismissed-50-99'
    bannerTitle = 'Great Progress!'
    bannerText = (
      <>
        You’ve earned a <strong>1.1x</strong> multiplier for translating 50% of
        the terms in this language. Translate 100% to earn a{' '}
        <strong>1.2x</strong> multiplier 🎉
      </>
    )
    bannerClass = 'bg-[#BFF5DB]'
  } else if (completionPercentage === 100) {
    bannerKey = 'bannerDismissed-100'
    bannerTitle = 'Congratulations!'
    bannerClass = 'bg-[#BFF5DB]'
    bannerText = (
      <>
        <strong>
          Thank you for translating 100% of the terms in this language
        </strong>{' '}
        ❤️ You’ve earned the maximum reward of a{' '}
        <strong>1.2x multiplier</strong> towards your total Translatathon score.
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
      className={`flex w-full items-center rounded border-none px-4 py-3 text-black ${bannerClass} md:mb-10`}
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
