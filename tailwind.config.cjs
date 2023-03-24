/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateAreas: {
        'mainBoard': [
          '1_1 1_2 1_3 1_4 1_5 1_6 1_7 1_8 1_9',
          '2_1 2_2 2_3 2_4 2_5 2_6 2_7 2_8 2_9',
          '3_1 3_2 3_3 3_4 3_5 3_6 3_7 3_8 3_9',
          '4_1 4_2 4_3 4_4 4_5 4_6 4_7 4_8 4_9',
          '5_1 5_2 5_3 5_4 5_5 5_6 5_7 5_8 5_9',
          '6_1 6_2 6_3 6_4 6_5 6_6 6_7 6_8 6_9',
          '7_1 7_2 7_3 7_4 7_5 7_6 7_7 7_8 7_9',
          '8_1 8_2 8_3 8_4 8_5 8_6 8_7 8_8 8_9',
          '9_1 9_2 9_3 9_4 9_5 9_6 9_7 9_8 9_9',
        ],
      },
      gridTemplateColumns: {
        'mainGrid': '1fr 150px'
      }   
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ]
}
