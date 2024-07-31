// app/page.js
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { getURL } from '../utils/getUrl'
import Image from 'next/image'

export default async function HomePage() {
  const {
    data: { session },
    error,
  } = await createSupabaseServerComponentClient().auth.getSession()

  const user = session?.user
  const url = getURL('/auth/login') || 'none'

  return (
    <div className="flex min-h-screen flex-col items-center text-white font-sans">
      <section className="relative w-full h-screen flex items-center justify-center">
        <img
          src="/images/hero.png"
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
          alt="hero"
        />
        <div className="relative z-10 flex flex-col basis-[1024px] max-w-screen-lg">
          <h1 className="flex flex-col font-serif font-bold text-[80px] leading-[88px] mb-8">
            <span>A glossary for</span>
            <span className="text-[86px] leading=[94px] text-[#F7C544]">
              Ethereum jargon
            </span>
          </h1>
          <p className="mb-4 text-2xl">
            Unlock the power of Ethereum in your language
          </p>
          <button className="bg-button-gradient font-extrabold max-w-[223px] text-[27px] px-4 py-2 rounded-lg">
            Let's go
          </button>
        </div>
      </section>

      {/* What is EthGlossary section */}
      <section className="mt-40 flex flex-col lg:flex-row items-center max-w-4xl w-full relative bg-homepage-gradient">
        <div className="flex-1 p-4">
          <div className="flex items-center mb-4 relative">
            {/* <div className="text-pink-600 text-4xl mr-2 absolute -left-20">
              <svg
                width="95"
                height="108"
                viewBox="0 0 95 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 10.9819C2.5 6.02132 6.52024 2 11.4795 2H83.5206C88.4798 2 92.5 6.02133 92.5 10.9819V79.8759C92.5 84.8365 88.4798 88.8578 83.5206 88.8578H79.2024C75.2288 88.8578 72.0101 92.0845 72.0188 96.0591L72.0407 106L51.9463 91.286C49.7917 89.7083 47.1908 88.8578 44.5206 88.8578H20.5342H11.4794C6.52023 88.8578 2.5 84.8365 2.5 79.8759V10.9819Z"
                  stroke="#ED0161"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
              </svg>
            </div> */}
            <h2 className="text-[64px] font-bold font-serif">
              What is ETHGlossary?
            </h2>
          </div>
          <p className="mb-4 text-lg">
            ETHGlossary is an open-source project dedicated to translating a
            core set of Ethereum terms into more than 60 languages.
          </p>
          <p className="text-lg">
            Whether you're an aspiring translator looking to gain experience or
            a passionate advocate for Ethereum accessibility, your contributions
            can make a difference.
          </p>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end p-4 pl-20">
          <img
            src="/images/globe.png"
            alt="Globe"
            className="w-48 h-48 lg:w-96 lg:h-96 object-contain"
          />
        </div>
      </section>

      <main className="w-full max-w-4xl p-6 space-y-12">
        <section className="text-center">
          <h2 className="text-6xl font-bold">62</h2>
          <p className="mt-2">Translation languages</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>Français</div>
            <div>বাংলা</div>
            <div>Čeština</div>
            {/* Add the other languages here */}
          </div>
          <button className="mt-6 px-6 py-3 bg-pink-600 text-white font-bold rounded">
            See all languages
          </button>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold">How it works</h2>
          <ol className="mt-4 list-decimal list-inside">
            <li>Suggest translations</li>
            <li>Vote and comment</li>
            <li>Get rewarded</li>
          </ol>
          <button className="mt-6 px-6 py-3 bg-yellow-600 text-black font-bold rounded">
            Sign in with Discord
          </button>
        </section>

        {/* Add any other sections as needed */}
      </main>

      <footer className="w-full text-center p-4 bg-gray-800">
        <h2 className="text-2xl font-bold">Translatathon 2024</h2>
        <p className="mt-2">
          Translate, translate, translate! The event runs from Fri 9 Aug - Sun
          Aug 18 2024.
        </p>
        <button className="mt-4 px-6 py-3 bg-pink-600 text-white font-bold rounded">
          Learn more
        </button>
      </footer>
    </div>
  )
}
