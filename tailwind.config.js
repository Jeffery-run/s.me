const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'linear-1': 'var(--gradient-1)',
        'linear-2': 'var(--gradient-2)',
        'linear-3': 'var(--gradient-3)',
      },
      maxWidth: {
        mw: '1140px',
      },
      colors: {
        primary: colors.teal,
        gray: colors.neutral,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'var(--color)',
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              marginTop: '0',
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: 'var(--color)',
              scrollMarginTop: '70px',
            },
            h2: {
              marginTop: '0',
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: 'var(--color)',
              scrollMarginTop: '70px',
            },
            h3: {
              marginTop: '0',
              fontWeight: '600',
              color: 'var(--color)',
              scrollMarginTop: '70px',
            },
            'h4,h5,h6': {
              marginTop: '0',
              color: 'var(--color)',
              scrollMarginTop: '70px',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            color: 'var(--color)',
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              marginTop: '0',
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: 'transparent',
              background: 'var(--gradient-1)',
              backgroundClip: 'text',
              scrollMarginTop: '70px',
              display: 'inline-block',
            },
            h2: {
              marginTop: '0',
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: 'transparent',
              background: 'var(--gradient-1)',
              backgroundClip: 'text',
              scrollMarginTop: '70px',
              display: 'inline-block',
            },
            h3: {
              marginTop: '0',
              fontWeight: '600',
              letterSpacing: theme('letterSpacing.tight'),
              color: 'transparent',
              background: 'var(--gradient-1)',
              backgroundClip: 'text',
              scrollMarginTop: '70px',
              display: 'inline-block',
            },
            'h4,h5,h6': {
              marginTop: '0',
              color: 'transparent',
              background: 'var(--gradient-1)',
              backgroundClip: 'text',
              scrollMarginTop: '70px',
              display: 'inline-block',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [forms, typography],
};
