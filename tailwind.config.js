/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'movies': "url('assets/movie.jpeg')",
        'temp': "url('assets/temp.jpg')"
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 3s ease-in-out',
      },
      
    
    },
  },
  plugins: [],
}

