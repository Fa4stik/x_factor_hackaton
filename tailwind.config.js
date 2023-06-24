/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'montserratReg': ['Montserrat-Regular', 'system-ui', 'sans-serif'],
        'montserratBold': ['Montserrat-Bold', 'system-ui', 'sans-serif'],
      },
      animation: {
        spin: 'spin 20s linear infinite',
        scaleAndFade: "scaleAndFade 8s infinite"
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scaleAndFade: {
          "0%": {
            transform: 'scale(1)',
            opacity: '1',
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "0.5",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
}

