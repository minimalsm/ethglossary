// app/page.js
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { getURL } from '../utils/getUrl'
import { fetchLanguages } from '@/lib/fetchLanguages'
import { getLanguageData } from '@/lib/languageUtils'
import LanguageList from '@/components/languages/LanguagesList'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FaDiscord } from 'react-icons/fa'

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

  const user = session?.user
  const url = getURL('/auth/login') || 'none'

  return (
    <div className="flex min-h-screen flex-col items-center font-sans text-white">
      {/* <div>
        <Button>Next term</Button>
        <Button variant="outline">Suggest another</Button>
      </div> */}
      <section className="relative grid h-screen max-h-[540px] w-full grid-cols-[minmax(auto,1440px)] md:max-h-[640px]">
        <img
          src="/images/hero.png"
          className="absolute inset-0 z-[-1] h-full w-full object-cover"
          alt="hero"
        />

        {/* new nav */}
        <div className="mx-auto mt-4 flex w-full justify-between self-start">
          <img
            src="/images/icon.png"
            width={40}
            alt="Logo"
            className="ml-8 object-contain"
          />
          <Button className="mr-4 justify-self-end">
            <FaDiscord className="mr-2 size-[16px]" />
            <span className="text-xs font-bold">Sign In</span>
          </Button>
        </div>
        {/* hero content */}
        <div className="container relative z-10 mx-auto flex flex-col items-start justify-center self-start">
          <h1 className="text-4.5xl mb-8 flex flex-col font-serif text-[40px] font-bold leading-[48px] md:text-7xl">
            <span>A glossary for</span>
            <span className="text-primary">Ethereum jargon</span>
          </h1>
          <p className="mb-4 text-xl md:text-2xl">
            Unlock the power of Ethereum in your language
          </p>
          <button className="rounded-full bg-button-gradient px-8 py-3 text-lg font-extrabold shadow-2xl md:px-12 md:py-4 md:text-3xl">
            Let&apos;s go
          </button>
        </div>
      </section>

      <div className="flex w-full flex-col items-center bg-homepage-gradient px-4">
        {/* What is EthGlossary section */}
        <section className="relative mt-11 flex w-full max-w-[961px] flex-col items-center md:mt-40 lg:flex-row">
          <div className="flex-1">
            <div className="relative mb-4 flex items-center">
              <h2 className="text-4.5xl md:text-6.5xl font-serif font-bold">
                What is ETHGlossary?
              </h2>
            </div>
            <p className="mb-4 md:text-lg">
              ETHGlossary is an open-source project dedicated to translating a
              core set of Ethereum terms into more than 60 languages.
            </p>
            <p className="md:text-lg">
              Whether you&apos;re an aspiring translator looking to gain
              experience or a passionate advocate for Ethereum accessibility,
              your contributions can make a difference.
            </p>
          </div>

          <div className="flex flex-1 justify-center p-4 md:pl-20 lg:justify-end">
            <img
              src="/images/globe.png"
              alt="Globe"
              className="size-72 object-contain lg:h-96 lg:w-96"
            />
          </div>
        </section>

        {/* Languages */}

        <section className="mt-11 flex max-w-[961px] flex-col gap-8 md:mt-40 md:gap-12">
          <h2 className="flex flex-col text-5xl font-bold">
            <span className="text-7xl md:text-[156px] md:leading-[162px]">
              62
            </span>
            <span className="text-2xl md:text-5xl">Translation languages</span>
          </h2>
          <LanguageList
            className={
              'grid grid-cols-1 gap-4 md:grid md:grid-cols-[minmax(220px,309px)_minmax(240px,309px)_minmax(220px,309px)] md:gap-3'
            }
            languages={languagesWithLocalAndCountries}
          />
          <p className="text-right font-serif text-2xl font-bold">
            ...and more!
          </p>
        </section>

        {/* How it works */}
        <div className="bg-darkBlue flex min-h-screen flex-col items-center justify-center text-white">
          <section className="flex w-full max-w-6xl flex-col items-start space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
            {/* <!-- Heading Section --> */}
            <div className="flex-1">
              <div className="relative mb-4 flex items-center">
                <div className="absolute left-[-200px] top-4 mr-2 text-4xl text-blue-400">
                  {/* <!-- Placeholder for Speech Bubble Icon --> */}
                  <SpeechBubble className="h-36 w-36" />
                </div>
                <h2 className="text-4.5xl md:text-6.5xl font-bold">
                  How it works
                </h2>
              </div>
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

              <div className="flex flex-col gap-4">
                <Button className="w-full py-6 text-base font-bold">
                  Sign in with Discord
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-6 text-base font-bold"
                >
                  About the translatathon
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* how to get started */}
      <section className="flex w-full flex-col items-center bg-dotted-gradient bg-[length:16px_16px] px-4">
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

      <section className="flex w-full flex-col items-center">
        <div className="flex w-full items-center justify-center bg-dolphin-gradient px-4">
          <div className="relative flex w-full max-w-[1144px] flex-col items-center text-center">
            <div class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
              <img src="/images/dolphin.png" alt="hero" className="min-w-64" />
            </div>
            <div className="mb-36 mt-40">
              <p className="mb-2 text-[#B3A8C0]">Part of ethereum.org</p>
              <h2 className="mb-10 text-4xl font-bold">Translatathon 2024</h2>
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
              <button className="mt-16 rounded-full border-2 border-[#F7E544] bg-transparent px-6 py-3 font-bold text-[#F7E544]">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const GetStartedCard = ({ number, color, heading, text }) => {
  return (
    <div
      className={cn(
        `border-[${color}]`,
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
    text: 'Why this is important / benefits the user, copy that probably runs over two lines.',
  },
  {
    number: 2,
    color: '#0EAAA0',
    heading: 'Crowdin',
    text: 'Why this is important / benefits the user, copy that probably runs over two lines.',
  },
  {
    number: 3,
    color: '#479CEA',
    heading: 'Join the Discord channel',
    text: 'Why this is important / benefits the user, copy that probably runs over two lines.',
  },
]

const translatathonCardData = [
  {
    number: 1,
    emoji: '🎉',
    color: '#AA7FFF',
    heading: 'Sign in with Discord',
    text: 'Why this is important / benefits the user, copy that probably runs over two lines.',
  },
  {
    number: 2,
    emoji: '🔍',
    color: '#0EAAA0',
    heading: 'Crowdin?',
    text: 'Why this is important / benefits the user, copy that probably runs over two lines.',
  },
  {
    number: 3,
    emoji: '👑',
    color: '#479CEA',
    heading: 'Join the Discord channel',
    text: 'Why this is important / benefits the user, copy that probably runs over two lines.',
  },
]

const TranslatathonCard = ({ number, emoji, color, heading, text }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-3 rounded-md border border-[#4F2A7F] bg-[#341A54] px-6 py-8',
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
    heading: 'Vote and comment',
    text: 'Vote and comment on the translations suggested by others, to reach consensus on the best translations.',
  },
  {
    number: 3,
    color: '#479CEA',
    heading: 'Get rewarded',
    text: 'Receive a Translatathon score multiplier for translating terms! Learn more about rewards on Crowdin etc.',
  },
]

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
