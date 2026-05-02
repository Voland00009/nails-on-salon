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
        'h4-mobile': ['1.0625rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'h4-desktop': ['1.1875rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'body-large': ['1.125rem', { lineHeight: '1.6' }],
        'body-desktop': ['1.0625rem', { lineHeight: '1.6' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-small': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'ui': ['0.875rem', { lineHeight: '1', letterSpacing: '0.06em' }],
        'ui-desktop': ['0.9375rem', { lineHeight: '1', letterSpacing: '0.06em' }],
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.08em' }],
        'micro': ['0.8125rem', { lineHeight: '1.5' }],
        'ui-medium': ['0.9375rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        'container-sm': '960px',
        'container-lg': '1120px',
        'container-xl': '1280px',
      },
      borderRadius: {
        'pill': '9999px',
      },
      boxShadow: {
        'brand-sm': '0 2px 6px rgba(28,16,24,0.08)',
        'brand-lg': '0 4px 12px rgba(28,16,24,0.1)',
      },
      scale: {
        103: '1.03',
      },
    },
  },
  plugins: [],
};
