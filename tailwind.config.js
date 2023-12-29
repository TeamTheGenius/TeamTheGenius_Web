/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        _primary: {
          50: '#6054FF',
          30: '#7579FF',
          10: '#EDEEFF',
        },
        _accent: {
          30: '#FF6584',
        },
        _neutral: {
          70: '#3F3D56',
          80: '#2F2E41',
          10: '#E6E6E6',
          50: '#858587',
        },

      },
      fontFamily: {
        "pretendard": ["Pretendard Variable", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "sans-serif"],
        "RobotoMedium": ['RobotoMedium']
      },

      fontSize: {
        _h1: "3.2rem",
        _h2: "2.4rem",
        _h3: "2rem",
        _h4: "1.8rem",
        _body1: "1.6rem",
        _caption: "1.4rem",
      },

      lineHeight: {
        _normal: 'normal',
      }
    },
  },
  plugins: [],
}

