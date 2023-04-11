const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      transitionDelay: {
        '600': '600ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
      },
      transitionDuration: {
        2000: '2000ms',
        3000: '3000ms',
        4000: '4000ms',
        5000: '5000ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "slide-in-out": {
          '0%': {
            opacity: 0,
            transform: "scale(0.7) translateX(-200%)"
          },
          '10%': {
            opacity: 0,
            transform: "scale(0.7) translateX(-200%)"
          },
          '50%': {
            opacity: 1
          },
          '75%': {
            opacity: 1,
            transform: "scale(1) translateX(50%)"
          },
          '90%': {
            opacity: 0,
            transform: "scale(0.7) translateX(150%)"
          },
          '100%': {
            opacity: 0
          },
        },
        "wormhole": {
          '0%': {
            opacity: 1,
            transform: 'scale(0, 0)'
          },

          '100%': {
            opacity: 0,
            transform: 'scale(15, 12)'
          },
        },
        "wormhole-small": {
          '0%': {
            opacity: 0,
            transform: 'scale(4, 0.1)'
          },
          '35%': {
            opacity: 1,
            transform: 'scale(5, 3)'
          },
          '100%': {
            opacity: 0,
            transform: 'scale(0.1, 0.1)'
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-out": "slide-in-out 2.5s ease-in-out infinite",
        "wormhole": "wormhole 10s ease-out infinite",
        "wormhole-small": "wormhole-small 0.875s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

