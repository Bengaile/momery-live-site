/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1f3329', deep: '#142019' },
        cream: { DEFAULT: '#f6efe1', 2: '#efe5cf' },
        gold: { DEFAULT: '#c9a24b', soft: '#e0c074' },
        charcoal: '#2b2723',
        lake: '#5c7c8a',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
