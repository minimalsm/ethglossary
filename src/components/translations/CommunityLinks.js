import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const CommunityLinksCard = ({ className }) => {
  const links = [
    {
      href: '#',
      src: '/images/icons/crowdin.png',
      alt: 'Crowdin Logo',
      text: 'Crowdin',
    },
    {
      href: '#',
      src: '/images/icons/delphi.png',
      alt: 'Translatathon Logo',
      text: 'Translatathon',
    },
    {
      href: '#',
      src: '/images/icons/discord.png',
      alt: 'Discord Logo',
      text: 'Discord',
    },
  ]

  return (
    <Card
      className={cn(
        className,
        'mx-5 border-none bg-[#E6DAFF] px-8 py-6 md:mx-0',
      )}
    >
      <CardHeader className="p-0">
        <CardTitle className="font-sans text-xl text-[#222739]">
          Translatathon 2024: Community links
        </CardTitle>
        <CardDescription className="mt-4 text-[#222739]">
          Connect with fellow translators and access essential resources for the
          event:
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-0 mt-4 flex flex-wrap gap-4 p-0">
        {links.map((link, index) => (
          <LinkCard
            key={index}
            href={link.href}
            src={link.src}
            alt={link.alt}
            text={link.text}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default CommunityLinksCard

const LinkCard = ({ href, src, alt, text }) => {
  return (
    <Link
      href={href}
      prefetch={false}
      className="flex min-w-[200px] flex-1 items-center justify-between rounded-[4px] bg-background p-3"
    >
      <div className="mr-4 flex items-center">
        <Image
          src={src}
          width={40}
          height={40}
          alt={alt}
          className="object-contain"
        />
        <p className="ml-3 font-bold">{text}</p>
      </div>
      <ArrowUpAndRight />
    </Link>
  )
}

const ArrowUpAndRight = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16667 14.6582L12.9917 5.83317H7.5V4.1665H15.8333V12.4998H14.1667V7.00817L5.34167 15.8332L4.16667 14.6582Z"
        fill="#3A3E50"
      />
    </svg>
  )
}
