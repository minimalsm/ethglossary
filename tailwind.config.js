/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        primaryTheme: '#EDF9F3',
        border: 'var(--border)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        primaryHover: 'var(--primary-hover)',
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'hsl(var(--accent-foreground))',
          green: 'var(--accent-green)',
          ultraViolet: 'var(--accent-ultra-violet)',
          tropIndigo: 'var(--accent-trop-indigo)',
          surface: 'var(--accent-surface)',
          vote: 'var(--accent-vote)',
          purple: 'var(--accent-purple)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        banner: {
          DEFAULT: 'var(--banner)',
          foreground: 'var(--banner-foreground)',
        },
        translated: {
          DEFAULT: 'var(--translated)',
          foreground: 'var(--translated-foreground)',
        },
        translatedHover: {
          DEFAULT: 'var(--translated-hover)',
          foreground: 'var(--translated-foreground)',
        },
        translatedActive: {
          DEFAULT: 'var(--translated-active)',
          foreground: 'var(--translated-active-foreground)',
        },
        text: {
          tertiary: 'var(--text-tertiary)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-serif)'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '20px' }],
        sm: ['14px', { lineHeight: '22px' }],
        lg: ['18px', { lineHeight: '26px' }],
        '3xl': ['28px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
        '4.5xl': ['38px', { lineHeight: '46px' }],
        '6.5xl': ['64px', { lineHeight: '72px' }],
        '7xl': ['72px', { lineHeight: '80px' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        // Todo: try to get gradient in CSS file to work properly
        'banner-gradient':
          'linear-gradient(90.8deg, #851211 0.89%, #652424 99.1%)',
        'card-gradient':
          'linear-gradient(94.3deg, rgba(235, 52, 49, 0.25) 4.12%, rgba(91, 11, 30, 0.25) 81.07%, rgba(66, 5, 4, 0.25) 94.25%);',
        'homepage-gradient':
          'linear-gradient(180deg, #E5ECFF 0%, #EBF0FF 52%, #F8FAFF 100%)',
        'dark-homepage-gradient':
          'linear-gradient(180deg, #1C202F 15.23%, #0E121F 36.54%, #1C202F 60.27%)',
        'button-gradient':
          'linear-gradient(106.76deg, #F7E544 4.85%, #EC0061 79.22%)',
        'dotted-gradient': 'radial-gradient(#49506B 1px, transparent 0);',
        'dark-dolphin-gradient':
          'linear-gradient(180deg, #2B0758 0%, #1C043A 54%, #110225 100%);',
        'dolphin-gradient':
          'linear-gradient(180deg, #F8FAFF 0%, #EDE4FF 49%, #D2C3F0 100%);',
        'multi-texture': "url('/images/textures/multicolor-glyph.png')",
        'yellow-texture': "url('/images/textures/yellow-glyph.png')",
      },
      zIndex: {
        '-1': '-1', // To ensure your background is behind other content
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'class',
}
