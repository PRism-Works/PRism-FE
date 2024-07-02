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
        sans: ['Pretendard', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        h1: ['96px', '1.2'],
        h2: ['60px', '1.3'],
        h3: ['48px', '1.4'],
        h4: ['36px', '1.5'],
        body1: ['28px', '1.6'],
        body2: ['24px', '1.7'],
        body3: ['24px', '1.7'],
        body4: ['22px', '1.8'],
        body5: ['22px', '1.8'],
        body6: ['20px', '1.8'],
        body7: ['20px', '1.8'],
        body8: ['18px', '1.8'],
        mobile1: ['16px', '1.9'],
        mobile2: ['14px', '2.0'],
        caption: ['12px', '2.1'],
      },
      fontWeight: {
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
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
          50: '#FEF2F2',
          500: '#FF4235',
        },
        success: {
          50: '#E2F7F0',
          500: '#00B45E',
        },
        info: {
          50: '#E6F0FF',
          500: '#0064FF',
        },
        errorclicked: '#7D032F',
        black: '#000000',
        white: '#FFFFFF',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
          fontSize: '48px',
          fontWeight: '700',
          lineHeight: '1.4',
        },
        '.headline4': {
          fontSize: '36px',
          fontWeight: '700',
          lineHeight: '1.5',
        },
        '.body1': {
          fontSize: '28px',
          fontWeight: '600',
          lineHeight: '1.6',
        },
        '.body2': {
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '1.7',
        },
        '.body3': {
          fontSize: '24px',
          fontWeight: '500',
          lineHeight: '1.7',
        },
        '.body4': {
          fontSize: '22px',
          fontWeight: '500',
          lineHeight: '1.8',
        },
        '.body5': {
          fontSize: '22px',
          fontWeight: '400',
          lineHeight: '1.8',
        },
        '.body6': {
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '1.8',
        },
        '.body7': {
          fontSize: '20px',
          fontWeight: '500',
          lineHeight: '1.8',
        },
        '.body8': {
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '1.8',
        },
        '.mobile1': {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '1.9',
        },
        '.mobile2': {
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '2.0',
        },
        '.caption': {
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '2.1',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};

export default config;
