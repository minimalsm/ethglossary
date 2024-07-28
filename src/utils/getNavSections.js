export const getNavSections = user => [
  {
    heading: 'Navigation',
    items: [
      {
        href: '/translate',
        linkText: 'Translate',
        defaultLanguage: true,
      },
      {
        href: '/languages',
        linkText: 'Languages',
        translatingNow: true,
      },
      {
        href: '/leaderboard',
        linkText: 'Leaderboards',
      },
    ],
  },
  {
    heading: 'Account',
    items: user
      ? [
          {
            href: '/logout',
            linkText: 'Log out',
          },
        ]
      : [
          {
            href: '/auth/login',
            linkText: 'Log in',
          },
        ],
  },
]
