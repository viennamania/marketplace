/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],


  darkMode: 'class',

  theme: {

    screens: {
      xs: '500px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1780px',
      '4xl': '2160px', // only need to control product grid mode in ultra 4k device
    },

    extend: {
      animation: {
        flip:'flip 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes:{
        flip: {
          'from': { transform:  'rotateX(0deg)', transformOrigin: '50% bottom ', },
          'to':{transform:  'rotateX(180deg)', transformOrigin: '50% bottom ',}
        }
      }
    },
  },
  plugins: [],
}

