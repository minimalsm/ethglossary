import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { getURL } from '../utils/getUrl'
import { fetchLanguages } from '@/lib/fetchLanguages'
import { getTotalTerms } from '@/lib/getTotalTerms'
import { getLanguageData } from '@/lib/languageUtils'
import LanguageList from '@/components/languages/LanguagesList'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import HomepageDesktopNav from '@/components/navigation/homepage/HomepageDesktopNav'
import { ArrowUpAndRight } from '@/components/icons'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import AuthButton from '@/components/auth/AuthButton'
import globe from '../../public/images/globe.png'
import dolphin from '../../public/images/dolphin.png'
import hero from '../../public/images/hero.png'
import { isValidDate } from '@/lib/date'
import { END_DATE, POINTS_PER_TERM, START_DATE, YEAR } from '@/lib/constants'

export default async function HomePage() {
  const {
    data: { session },
    error,
  } = await createSupabaseServerComponentClient().auth.getSession()

  const languages = await fetchLanguages()
  const languagesWithLocalAndCountries = languages.map(language => {
    const languageData = getLanguageData(language.code)
    return {
      ...language,
      localName: languageData?.localName,
      countries: languageData?.countries,
    }
  })

  const totalTerms = await getTotalTerms()

  const user = session?.user
  if (user) {
    console.log('USER HERE', user)
  }
  // const userWithMetaData = await fetchUserMetadata(user)
  // console.log(userWithMetaData)
  const url = getURL('/auth/login') || 'none'

  return (
    <div className="flex min-h-screen flex-col items-center font-sans">
      <HeroSection user={user} />
      <div
        className={cn(
          'relative flex w-full flex-col items-center px-4',
          'bg-gradient-to-b from-[#E5ECFF] via-[#EBF0FF] to-[#F8FAFF]',
          'dark:from-[#1C202F] dark:from-[15%] dark:via-[#0E121F] dark:via-[37%] dark:to-[#1C202F] dark:to-[60%]',
        )}
      >
        <BackgroundMulticolorTexture />
        <BackgroundYellowTexture />
        <WhatIsETHGlossarySection languages={languages} />
        <LanguagesSection
          languages={languagesWithLocalAndCountries}
          className="mb-11"
        />
        <HowItWorksSection user={user} totalTerms={totalTerms} />

        {/* Background textures */}
      </div>
      <HowToGetStartedSection />
      <TranslatathonSection />
    </div>
  )
}

const GetStartedCard = ({ number, color, heading, text }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-[8px] border-2 bg-background px-6 py-8 text-center',
      )}
      style={{ borderColor: color }}
    >
      <h3 className="font-sans text-xl font-semibold">{heading}</h3>
      <p>{text}</p>
    </div>
  )
}

const getStartedCardData = [
  {
    number: 1,
    color: '#AA7FFF',
    heading: 'Sign in with Discord',
    text: 'Register for an ETHGlossary account using your Discord login details',
  },
  {
    number: 2,
    color: '#0EAAA0',
    heading: 'Select a language',
    text: 'Choose the language you would like to translate the Ethereum glossary into',
  },
  {
    number: 3,
    color: '#479CEA',
    heading: 'Start translating',
    text: 'Suggest translations and vote on the translations suggested by others in the community',
  },
]

const formattedDateRange = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).formatRange(
  new Date(isValidDate(START_DATE) ? START_DATE : END_DATE),
  new Date(isValidDate(END_DATE) ? END_DATE : START_DATE),
)

const translatathonCardData = [
  {
    number: 1,
    emoji: '🎉',
    color: '#AA7FFF',
    heading: 'Event begins',
    text: `Translate, translate, translate! The event runs from ${formattedDateRange}.`,
  },
  {
    number: 2,
    emoji: '🔍',
    color: '#0EAAA0',
    heading: 'Evaluation period',
    text: 'Each translation is evaluated for authenticity. The use of AI is prohibited.',
  },
  {
    number: 3,
    emoji: '👑',
    color: '#479CEA',
    heading: 'Winners announced',
    text: 'Results will be announced on the ethereum.org community call.',
  },
]

const TranslatathonCard = ({ number, emoji, color, heading, text }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-3 rounded-md border border-[#F0F0F0] bg-[#E1D7F3] px-6 py-8 dark:border-[#4F2A7F] dark:bg-[#341A54]',
      )}
    >
      <span className="text-[40px]">{emoji}</span>
      <div className="flex flex-col items-start gap-2">
        <h3 className="font-sans text-xl font-semibold">{heading}</h3>
        <p className="text-left">{text}</p>
      </div>
    </div>
  )
}

const BackgroundMulticolorTexture = () => {
  return (
    <div className="absolute left-[-150px] top-1/2 h-[490px] w-[308px] bg-multi-texture" />
  )
}

const BackgroundYellowTexture = () => {
  return (
    <div className="absolute right-1 top-1/3 h-[250px] w-[152px] bg-yellow-texture" />
  )
}

const HowItWorksListItem = ({ number, color, heading, text }) => {
  return (
    <li className="flex items-start gap-6">
      <SpeechBubble number={number} color={color} />
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">{heading}</h3>
        <p>{text}</p>
      </div>
    </li>
  )
}

const SpeechBubble = ({ number = null, color, className = 'w-16 h-16' }) => {
  const bubbleColor = color || '#ED0161'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 95 108"
      className={className}
      fill="none"
    >
      <path
        d="M2.5 10.9819C2.5 6.02132 6.52024 2 11.4795 2H83.5206C88.4798 2 92.5 6.02133 92.5 10.9819V79.8759C92.5 84.8365 88.4798 88.8578 83.5206 88.8578H79.2024C75.2288 88.8578 72.0101 92.0845 72.0188 96.0591L72.0407 106L51.9463 91.286C49.7917 89.7083 47.1908 88.8578 44.5206 88.8578H20.5342H11.4794C6.52023 88.8578 2.5 84.8365 2.5 79.8759V10.9819Z"
        stroke={bubbleColor}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <text
        x="50%"
        y="48%"
        textAnchor="middle"
        dy=".3em"
        fontSize="40"
        fill={bubbleColor}
        fontWeight="bold"
      >
        {number}
      </text>
    </svg>
  )
}

// Todo: fix image background color
const HeroSection = ({ user = null }) => {
  return (
    <section className="relative grid h-screen max-h-[540px] w-full md:max-h-[640px]">
      <div className="absolute inset-0 -z-[1] h-full w-full object-cover">
        <Image
          src={hero}
          className="fixed inset-0 -z-[1] h-full w-full bg-blue-400 bg-light-dotted-gradient bg-[length:16px_16px] object-cover md:h-[650px]"
          sizes="100vw"
          alt="hero"
        />
      </div>
      {/* new nav */}
      <HomepageDesktopNav user={user} />
      <div className="container relative z-10 mx-auto mb-2 flex flex-col items-start justify-center self-start p-0 px-4 text-white">
        <h1 className="mb-4 flex flex-col font-serif text-4.5xl text-[40px] font-bold leading-[48px] md:text-7xl">
          <span>A glossary for</span>
          <span className="text-primary">Ethereum jargon</span>
        </h1>
        <p className="mb-12 text-xl md:text-2xl">
          Unlock the power of Ethereum in your language
        </p>
        {user ? (
          <Button asChild className="text-sm font-bold leading-none md:text-xl">
            <Link href="/languages">
              <Avatar className="mr-2 h-4 w-4 md:h-8 md:w-8">
                <AvatarImage src={user.user_metadata.avatar_url} alt="U" />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              Continue translating
            </Link>
          </Button>
        ) : (
          <AuthButton
            className="text-sm font-bold leading-none md:text-xl"
            size="size-[20px] md:size-[24px]"
          />
        )}
      </div>
    </section>
  )
}

const WhatIsETHGlossarySection = ({ languages }) => {
  // Calculate number of languages, rounded down to nearest 10
  const numLanguages =
    Math.floor((typeof languages !== 'undefined' ? languages.length : 0) / 10) *
    10

  return (
    <section className="relative mt-11 flex w-full max-w-[961px] flex-col items-center md:mt-40 lg:flex-row">
      <div className="flex basis-8/12 flex-col gap-4 md:flex-row md:gap-8">
        <BubbleSvgTest color="#ED0161" />
        <div className="flex-1">
          <h2 className="mb-4 font-serif text-4.5xl font-bold md:text-6.5xl">
            What is ETHGlossary?
          </h2>

          <p className="basis- mb-4 md:text-lg">
            ETHGlossary is an open-source project dedicated to translating a
            core set of Ethereum terms into more than {numLanguages}+ languages.
          </p>
          <p className="md:text-lg">
            Whether you&apos;re an aspiring translator looking to gain
            experience or a passionate advocate for Ethereum accessibility, your
            contributions can make a difference.
          </p>
        </div>
      </div>

      <div className="flex p-4 md:size-96 md:pl-20">
        <Image
          src={globe}
          alt="Globe Image"
          sizes="(max-width: 768px) 18rem, 24rem"
          className="size-72 object-contain md:size-96"
        />
      </div>
    </section>
  )
}

const BubbleSvgTest = ({ color }) => {
  return (
    <svg
      viewBox="0 0 95 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[52px] w-[45px] md:h-[109px] md:w-[95px]"
    >
      <path
        d="M2.5 11.4819C2.5 6.52132 6.52024 2.5 11.4795 2.5H83.5206C88.4798 2.5 92.5 6.52133 92.5 11.4819V80.3759C92.5 85.3365 88.4798 89.3578 83.5206 89.3578H79.2024C75.2288 89.3578 72.0101 92.5845 72.0188 96.5591L72.0407 106.5L51.9463 91.786C49.7917 90.2083 47.1908 89.3578 44.5206 89.3578H20.5342H11.4794C6.52023 89.3578 2.5 85.3365 2.5 80.3759V11.4819Z"
        stroke={color}
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
  )
}

const LanguagesSection = ({ languages, className }) => {
  return (
    <section
      className={cn(
        'z-10 mt-11 flex max-w-[961px] flex-col gap-8 md:mt-32 md:gap-12',
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <BubbleSvgTest color="#AA7FFF" />
        <h2 className="flex flex-col text-5xl font-bold md:mt-[-32px]">
          <span className="text-7xl md:text-[156px] md:leading-[162px]">
            {languages.length}
          </span>
          <span className="text-2xl md:text-5xl">Translation languages</span>
        </h2>
      </div>
      <LanguageList
        className={
          'grid grid-cols-1 gap-4 md:grid md:grid-cols-[minmax(220px,309px)_minmax(240px,309px)_minmax(220px,309px)] md:gap-3'
        }
        languages={languages}
        max={15}
      />
      <p className="text-right font-serif text-2xl font-bold">...and more!</p>
    </section>
  )
}

const HowItWorksSection = ({ user = null, totalTerms }) => {
  const howItWorksData = [
    {
      number: 1,
      color: '#AA7FFF',
      heading: 'Suggest translations',
      text: 'Help us expand our English glossary by suggesting the ideal translation for Ethereum terms in your language.',
    },
    {
      number: 2,
      color: '#0EAAA0',
      heading: 'Interact with the community',
      text: 'Vote and comment on the translations suggested by others, to reach consensus on the best translations.',
    },
    {
      number: 3,
      color: '#479CEA',
      heading: 'Get rewarded',
      text: (
        <>
          Receive {POINTS_PER_TERM} points for each translated term. Translate
          all {totalTerms} terms and receive double points (
          {totalTerms * POINTS_PER_TERM * 2})!{' '}
          <a
            href="https://ethereum.org/en/contributing/translation-program/translatathon/details/"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-text-link"
          >
            Learn more about scoring and rewards.
          </a>
        </>
      ),
    },
  ]

  return (
    <section className="mb-11 mt-11 flex w-full max-w-[961px] flex-col items-start space-y-8 md:mb-16 md:mt-32 md:flex-row lg:space-x-8 lg:space-y-0">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <BubbleSvgTest color="#479CEA" />
        <h2 className="max-w-[10ch] flex-1 text-4.5xl font-bold md:text-6.5xl">
          How it works
        </h2>
      </div>

      {/* <!-- Steps Section --> */}
      <div className="flex-1 space-y-6">
        <ol className="list-inside list-decimal space-y-6">
          {howItWorksData.map((item, index) => (
            <HowItWorksListItem
              key={index}
              number={item.number}
              color={item.color}
              heading={item.heading}
              text={item.text}
            />
          ))}
        </ol>

        <div className="flex flex-col gap-4 md:flex-row">
          {user ? (
            <Button
              asChild
              className="text-sm font-bold leading-none md:px-6 md:py-5 md:text-base"
            >
              <Link href="/languages">
                <Avatar className="mr-2 h-4 w-4 md:h-6 md:w-6">
                  <AvatarImage src={user.user_metadata.avatar_url} alt="U" />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                Continue translating
              </Link>
            </Button>
          ) : (
            <AuthButton
              className="text-sm font-bold leading-none md:px-6 md:py-5 md:text-base"
              size="size-[24px]"
            />
          )}

          <Button
            asChild
            variant="outline"
            className="text-sm font-bold leading-none md:px-6 md:py-5 md:text-base"
          >
            <Link
              href="https://ethereum.org/en/contributing/translation-program/translatathon/"
              target="_blank"
            >
              About the translatathon <ArrowUpAndRight className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const HowToGetStartedSection = () => {
  return (
    <section className="flex w-full flex-col items-center bg-[#E7EDFF] bg-light-dotted-gradient bg-[length:16px_16px] px-4 dark:bg-[#0A1126] dark:bg-dotted-gradient">
      <div className="mt-32 flex w-full max-w-[960px] flex-col items-center">
        <h2 className="mb-14 text-center text-5xl font-bold">
          How to get started
        </h2>
        <div className="mb-48 grid w-full max-w-[960px] gap-8 md:mb-72 md:grid-cols-3 md:gap-8">
          {getStartedCardData.map((item, index) => (
            <GetStartedCard
              key={item.number}
              number={item.number}
              color={item.color}
              heading={item.heading}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const TranslatathonSection = () => {
  return (
    <section className="flex w-full flex-col items-center">
      <div
        className={cn(
          'flex w-full items-center justify-center px-4 dark:bg-dark-dolphin-gradient',
          'bg-background bg-gradient-to-b dark:from-[#2B0758]/50 dark:via-[#1C043A]/50 dark:to-[#110225]/50',
          'from-[#F8FAFF]/50 via-[#EDE4FF]/50 to-[#D2C3F0]/50',
        )}
      >
        <div className="relative flex w-full max-w-[1144px] flex-col items-center text-center">
          <div class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
            <Image
              src={dolphin}
              alt="hero"
              sizes="20rem"
              className="min-w-64"
            />
          </div>
          <div className="mb-36 mt-40">
            <p className="mb-2 text-[#B3A8C0]">Part of ethereum.org</p>
            <h2 className="mb-10 text-4xl font-bold">Translatathon {YEAR}</h2>
            <div className="grid w-full max-w-[1144px] grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
              {translatathonCardData.map((item, index) => (
                <TranslatathonCard
                  key={index}
                  emoji={item.emoji}
                  heading={item.heading}
                  text={item.text}
                />
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-16 border-2 bg-transparent font-bold"
            >
              <Link href="https://ethereum.org/en/contributing/translation-program/translatathon/">
                Learn more <ArrowUpAndRight className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
