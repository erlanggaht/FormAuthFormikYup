/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'ceklis': "url('/icon/ceklis.svg')",
      }

    },
  },
  plugins: [],
}

