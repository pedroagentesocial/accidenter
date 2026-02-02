module.exports = {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#176CB4",
          dark: "#121427",
          light: "#CEEAF7",
          muted: "#CCD7E4",
          accent: "#95B2B0",
          success: "#4E937A"
        }
      },
      fontFamily: {
        heading: ["Yeseva One", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", "serif"],
        accent: ["The Seasons", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", "sans-serif"],
        script: ["Moontime", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", "sans-serif"],
        body: ["Mont", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", "sans-serif"]
      }
    }
  },
  plugins: []
}
