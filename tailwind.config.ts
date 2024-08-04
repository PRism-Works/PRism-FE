import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
      },
      fontSize: {
        h1: ['96px', '1.2'],
        h2: ['60px', '1.3'],
        h3: ['48px', '1.4'],
        h4: ['36px', '1.5'],
        body1: ['28px', '1.6'],
        body2: ['24px', '1.6'],
        body3: ['24px', '1.6'],
        body4: ['22px', '1.6'],
        body5: ['22px', '1.6'],
        body6: ['20px', '1.6'],
        body7: ['20px', '1.6'],
        body8: ['18px', '1.6'],
        mobile1: ['16px', '1.4'],
        mobile2: ['14px', '1.4'],
        caption: ['12px', '1.4'],
        display1: ['20px', '1.4'],
        display2: ['20px', '1.4'],
        display3: ['18px', '1.4'],
        display4: ['16px', '1.4'],
        display5: ['14px', '1.2'],
        display6: ['16px', '1.2'],
      },
      fontWeight: {
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
      },
      screens: {
        xs: { max: '430px' },
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        danger: {
          DEFAULT: '#FF4235',
          50: '#FEF2F2',
          500: '#FF4235',
        },
        success: {
          DEFAULT: '#00B45E',
          50: '#E2F7F0',
          500: '#00B45E',
        },
        info: {
          DEFAULT: '#0064FF',
          50: '#E6F0FF',
          500: '#0064FF',
        },
        errorclicked: '#7D032F',
        black: '#000000',
        white: '#FFFFFF',
        customGradient:
          'linear-gradient(173.26deg, #2F145A 1.76%, #60239C 25.67%, #37188E 49.11%, #60239C 73.51%, #21197C 97.43%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'custom-2px': '0 2px 4px 0 rgba(55, 65, 81, 0.18)', // X0 Y2 blur4 spread0 #374151 (grey_700) 18%
        'custom-4px': '0 4px 8px 0 rgba(55, 65, 81, 0.12)', // X0 Y4 blur8 spread0 #374151 (grey_700) 12%
        'custom-6px': '0 6px 12px 0 rgba(55, 65, 81, 0.10)', // X0 Y6 blur12 spread0 #374151 (grey_700) 10%
        'custom-8px': '0 8px 16px 0 rgba(55, 65, 81, 0.10)', // X0 Y8 blur16 spread0 #374151 (grey_700) 10%
        'custom-16px': '0 16px 32px 0 rgba(55, 65, 81, 0.10)', // X0 Y16 blur32 spread0 #374151 (grey_700) 10%
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
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.headline1': {
          fontSize: '96px',
          fontWeight: '700',
          lineHeight: '1.2',
        },
        '.headline2': {
          fontSize: '60px',
          fontWeight: '700',
          lineHeight: '1.3',
        },
        '.headline3': {
          fontSize: '42px',
          fontWeight: '700',
          lineHeight: '1.4',
        },
        '.headline4': {
          fontSize: '36px',
          fontWeight: '700',
          lineHeight: '1.4',
        },
        '.body1': {
          fontSize: '28px',
          fontWeight: '600',
          lineHeight: '1.6',
        },
        '.body2': {
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '1.6',
        },
        '.body3': {
          fontSize: '24px',
          fontWeight: '500',
          lineHeight: '1.6',
        },
        '.body4': {
          fontSize: '22px',
          fontWeight: '500',
          lineHeight: '1.6',
        },
        '.body5': {
          fontSize: '22px',
          fontWeight: '400',
          lineHeight: '1.6',
        },
        '.body6': {
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '1.6',
        },
        '.body7': {
          fontSize: '20px',
          fontWeight: '500',
          lineHeight: '1.6',
        },
        '.body8': {
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '1.6',
        },
        '.mobile1': {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '1.6',
        },
        '.mobile2': {
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '1.4',
        },
        '.caption': {
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '1.4',
        },
        '.display1': {
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '1.4',
        },
        '.display2': {
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '1.4',
        },
        '.display3': {
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '1.4',
        },
        '.display4': {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.4',
        },
        '.display5': {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '1.2',
        },
        '.display6': {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '1.4',
        },
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.flex-col-center': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.bg-purple-indigo-gradient': {
          '@apply bg-gradient-to-b from-purple-500 to-indigo-500': {},
          '&:hover': {
            '@apply from-purple-600 to-indigo-600': {},
          },
        },
        '.border-gradient': {
          border: '2px solid transparent',
          backgroundImage:
            'linear-gradient(white, white), linear-gradient(to bottom, #A855F7, #6366F1)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        },
        '.scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '3px',
            height: '3px',
          },
          '&::-webkit-scrollbar-track': {
            '@apply bg-transparent': {},
          },
          '&::-webkit-scrollbar-thumb': {
            '@apply bg-transparent rounded': {},
          },
          '&:hover::-webkit-scrollbar-thumb': {
            '@apply bg-gray-400': {},
          },
          '&:hover::-webkit-scrollbar-thumb:hover': {
            '@apply bg-gray-500': {},
          },
          '.scroll-smooth': {
            'scroll-behavior': 'smooth',
          },
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};

export default config;
