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
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: 'shimmer 2s linear infinite',


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
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '0 0',
          },
          '100%': {
            backgroundPosition: '-200% 0',
          },
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
