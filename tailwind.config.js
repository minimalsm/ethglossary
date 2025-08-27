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
        border: {
          DEFAULT: 'var(--border)',
          selectedStrong: 'var(--border-selected-strong)',
        },
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
          callout: 'var(--accent-callout)',
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
          primary: 'var(--text-primary)',
          tertiary: 'var(--text-tertiary)',
          link: 'var(--text-link)',
        },
        surface: {
          extra: 'var(--surface-extra)',
          selected: 'var(--surface-selected)',
          hover: 'var(--surface-hover)',
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
        '3.5xl': ['32px', { lineHeight: '40px' }],
        '4xl': ['36px', { lineHeight: '44px' }],
        '4.5xl': ['38px', { lineHeight: '46px' }],
        '6.5xl': ['64px', { lineHeight: '72px' }],
        '7xl': ['72px', { lineHeight: '80px' }],
        'label-sm': ['14px', { lineHeight: '14px' }],
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
        'light-dotted-gradient': 'radial-gradient(#CDD1D9 1px, transparent 0);',
        'dotted-gradient': 'radial-gradient(#49506B 1px, transparent 0);',
        'multi-texture': "url('/images/textures/multicolor-glyph.png')",
        'yellow-texture': "url('/images/textures/yellow-glyph.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'class',
}
