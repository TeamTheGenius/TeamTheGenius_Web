/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        my: {
          primary: {
            50: '#6054FF',
            30: '#7579FF',
            10: '#EDEEFF',
          },
          accent: {
            30: '#FF6584',
          },
          neutral: {
            70: '#3F3D56',
            80: '#2F2E41',
            10: '#E6E6E6',
            50: '#858587',
          },
        }


      }
    },
  },
  plugins: [],
}

