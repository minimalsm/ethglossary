'use client'

import Sun from '@/components/icons/Sun'
import Moon from '@/components/icons/Moon'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function ThemeSwitch({ className }) {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={40}
        height={40}
        sizes="40x40"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    )

  if (resolvedTheme === 'dark') {
    return (
      <Button
        variant="ghost"
        className={cn(className, 'rounded-md text-foreground')}
        size="icon"
        onClick={() => setTheme('light')}
      >
        <Sun />
      </Button>
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <Button
        variant="ghost"
        className={cn(className, 'rounded-md text-foreground')}
        size="icon"
        onClick={() => setTheme('dark')}
      >
        <Moon />
      </Button>
    )
  }
}

export function MobileThemeSwitch({ className }) {
  // const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  // useEffect(() => setMounted(true), [])

  // if (!mounted)
  //   return (
  //     <Image
  //       src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
  //       width={40}
  //       height={40}
  //       sizes="40x40"
  //       alt="Loading Light/Dark Toggle"
  //       priority={false}
  //       title="Loading Light/Dark Toggle"
  //     />
  //   )

  if (resolvedTheme === 'dark') {
    return (
      <Button
        variant="ghost"
        className={cn(
          className,
          'w-full rounded-md !bg-[#F3F6FF] !text-[#1C202F]',
        )}
        onClick={() => setTheme('light')}
      >
        Light mode
        <Sun className="ml-2" />
      </Button>
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <Button
        variant="ghost"
        className={cn(
          className,
          'w-full rounded-md !bg-[#1C202F] !text-[#FFFFFF]',
        )}
        onClick={() => setTheme('dark')}
      >
        Dark mode
        <Moon className="ml-2" />
      </Button>
    )
  }
}
