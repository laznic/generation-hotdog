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
        kanji: ['Zen Antique'],
        body: ['Dinish'],
      },
      transitionDelay: {
        '600': '600ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '1600': '1600ms',
        '1700': '1700ms',
        '1800': '1800ms',
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
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
        },
        "fade-in-background": {
          '0%': {
            background: 'transparent',
            'backdrop-filter': 'blur(0px) brightness(0)'
          },
          '10%': {
            'backdrop-filter': 'blur(2px) brightness(2)'
          },
          '20%': {
            'backdrop-filter': 'blur(4px) brightness(1)'
          },
          '100%': {
            background: 'currentColor',
            'backdrop-filter': 'blur(8px) brightness(1)'
          }
        },
        "hotdog-image": {
          '0%': {
            opacity: 0,
            'border-radius': '50%',
            height: '0px',
            width: '0px',
            transform: 'scale(0)',
            filter: 'blur(36px)'
          },
          '50%': {
            opacity: 1,
            width: '512px',
            height: '512px',
            transform: 'scale(1.1)',
            filter: 'blur(10px)'
          },
          '91%': {
            opacity: 1,
            height: '512px',
            transform: 'scale(1)',
            filter: 'blur(0)'
          },
          '100%': {
            opacity: 1,
            height: '512px',
            transform: 'scale(1)',
            filter: 'blur(0)'
          }
        },
        "bounce-right": {
          '0%': {
            transform: 'translateX(0)'
          },
          '50%': {
            transform: 'translateX(25%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-out": "slide-in-out 2.5s ease-in-out infinite",
        "wormhole": "wormhole 10s ease-out forwards",
        "wormhole-small": "wormhole-small 0.5s ease-out forwards",
        "fade-in-background": "fade-in-background 4s ease-in-out forwards",
        "hotdog-image": "hotdog-image 3s ease-in-out forwards",
        "bounce-right": "bounce-right 1s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

