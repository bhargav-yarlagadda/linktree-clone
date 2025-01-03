/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation:{
        slideIn:'slideInKeyFrame 1s ease-out',
        fadeInUp: 'fadeInUp 1s ease-out forwards',

      },
      keyframes:{
        slideInKeyFrame :{
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(0)',},
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(80px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
