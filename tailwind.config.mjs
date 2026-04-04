/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: '#FFC2D1',
        'brand-hover': '#FFB3C6',
        ink: '#1C1018',
        'bg-tint': '#FFF5F7',
        muted: '#6B5B5E',
        gold: '#C4A265',
        border: '#F0E8EB',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },
      fontSize: {
        'display-mobile': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-desktop': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1-mobile': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h1-desktop': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2-mobile': ['1.5rem', { lineHeight: '1.25' }],
        'h2-desktop': ['1.875rem', { lineHeight: '1.25' }],
        'h3-mobile': ['1.125rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'h3-desktop': ['1.25rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'body-desktop': ['1.0625rem', { lineHeight: '1.6' }],
        'body-small': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'ui': ['0.875rem', { lineHeight: '1', letterSpacing: '0.06em' }],
        'ui-desktop': ['0.9375rem', { lineHeight: '1', letterSpacing: '0.06em' }],
      },
      maxWidth: {
        'container-sm': '960px',
        'container-lg': '1120px',
      },
      borderRadius: {
        'pill': '9999px',
      },
    },
  },
  plugins: [],
};
