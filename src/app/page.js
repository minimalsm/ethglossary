// app/page.js
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { getURL } from '../utils/getUrl'
import { fetchLanguages } from '@/lib/fetchLanguages'
import { getLanguageData } from '@/lib/languageUtils'
import LanguageList from '@/components/languages/LanguagesList'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
      <section className="relative flex h-screen max-h-[720px] w-full items-center justify-center">
        <img
          src="/images/hero.png"
          className="absolute inset-0 z-[-1] h-full w-full object-cover"
          alt="hero"
        />
        <div className="relative z-10 flex max-w-screen-lg basis-[1024px] flex-col p-4">
          <h1 className="mb-8 flex flex-col font-serif text-[40px] font-bold leading-[48px] md:text-[80px] md:leading-[88px]">
            <span>A glossary for</span>
            <span className="md:leading=[94px] text-[#F7C544] md:text-[86px]">
              Ethereum jargon
            </span>
          </h1>
          <p className="mb-4 text-2xl">
            Unlock the power of Ethereum in your language
          </p>
          <button className="max-w-[223px] rounded-lg bg-button-gradient px-4 py-2 text-[27px] font-extrabold">
            Let&apos;s go
          </button>
        </div>
      </section>

      {/* <div  className="grid md:grid-cols-[minmax(220px,288px)_minmax(240px,auto)_minmax(220px,288px)] gap-4"></div> */}
      <div className="flex w-full flex-col items-center bg-homepage-gradient">
        {/* What is EthGlossary section */}
        <section className="relative mt-40 flex w-full max-w-[961px] flex-col items-center lg:flex-row">
          <div className="flex-1 p-4">
            <div className="relative mb-4 flex items-center">
              {/* <div className="text-pink-600 text-4xl mr-2 absolute -left-20">
              <svg
                width="95"
                height="108"
                viewBox="0 0 95 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"x
              >
                <path
                  d="M2.5 10.9819C2.5 6.02132 6.52024 2 11.4795 2H83.5206C88.4798 2 92.5 6.02133 92.5 10.9819V79.8759C92.5 84.8365 88.4798 88.8578 83.5206 88.8578H79.2024C75.2288 88.8578 72.0101 92.0845 72.0188 96.0591L72.0407 106L51.9463 91.286C49.7917 89.7083 47.1908 88.8578 44.5206 88.8578H20.5342H11.4794C6.52023 88.8578 2.5 84.8365 2.5 79.8759V10.9819Z"
                  stroke="#ED0161"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
              </svg>
            </div> */}
              <h2 className="font-serif text-[64px] font-bold">
                What is ETHGlossary?
              </h2>
            </div>
            <p className="mb-4 text-lg">
              ETHGlossary is an open-source project dedicated to translating a
              core set of Ethereum terms into more than 60 languages.
            </p>
            <p className="text-lg">
              Whether you&apos;re an aspiring translator looking to gain
              experience or a passionate advocate for Ethereum accessibility,
              your contributions can make a difference.
            </p>
          </div>

          <div className="flex flex-1 justify-center p-4 pl-20 lg:justify-end">
            <img
              src="/images/globe.png"
              alt="Globe"
              className="h-48 w-48 object-contain lg:h-96 lg:w-96"
            />
          </div>
        </section>

        {/* Languages */}

        <section className="mt-40 flex max-w-[961px] flex-col">
          <h2 className="mb-12 flex flex-col text-5xl font-bold">
            <span className="text-[156px]">62</span>
            <span>Translation languages</span>
          </h2>
          <LanguageList
            className={
              'grid grid-cols-1 gap-4 md:grid md:grid-cols-[minmax(220px,309px)_minmax(240px,309px)_minmax(220px,309px)] md:gap-3'
            }
            languages={languagesWithLocalAndCountries}
          />
          <button className="mt-4 self-center rounded-lg bg-button-gradient px-[54px] py-2 text-[27px] font-extrabold">
            See all languages
          </button>
        </section>

        {/* How it works */}
        <div className="bg-darkBlue flex min-h-screen flex-col items-center justify-center p-6 text-white">
          <section className="flex w-full max-w-6xl flex-col items-start space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
            {/* <!-- Heading Section --> */}
            <div className="flex-1">
              <div className="relative mb-4 flex items-center">
                <div className="absolute left-[-200px] top-4 mr-2 text-4xl text-blue-400">
                  {/* <!-- Placeholder for Speech Bubble Icon --> */}
                  <SpeechBubble className="h-36 w-36" />
                </div>
                <h2 className="text-[64px] font-bold">How it works</h2>
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

              <div>
                <button className="mt-6 flex items-center space-x-2 rounded-lg bg-yellow-400 px-6 py-3 text-lg font-bold text-black hover:bg-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19V6l7 7-7 7z"
                    />
                  </svg>
                  <span>Sign in with Discord</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* how to get started */}
      <section className="flex w-full flex-col items-center bg-dotted-gradient bg-[length:16px_16px]">
        <div className="mt-36 flex w-full max-w-[960px] flex-col items-center">
          <h2 className="mb-14 flex flex-col text-5xl font-bold">
            How to get started
          </h2>
          {/* <div className="w-[720px] h-[400px] bg-[#434C6A] mb-16 flex items-center justify-center">
            <span className="text-8xl">▶️</span>
          </div> */}
          <div className="mb-72 grid w-full max-w-[960px] gap-3 md:grid-cols-3 md:gap-8">
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
        <div className="flex w-full items-center justify-center bg-dolphin-gradient">
          <div className="relative flex w-full max-w-[1144px] flex-col items-center text-center">
            <div class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
              <img src="/images/dolphin.png" alt="hero" />
            </div>
            <div className="mb-36 mt-40">
              <p className="mb-2 text-[#B3A8C0]">Part of ethereum.org</p>
              <h2 className="mb-10 text-4xl font-bold">Translatathon 2024</h2>
              <div className="grid w-full max-w-[1144px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
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
        'flex flex-col items-center gap-3 rounded-sm border-2 bg-background px-6 py-8 text-center',
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
