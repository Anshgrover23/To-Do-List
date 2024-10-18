/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(0deg, rgba(136, 0, 255, 1) 24%, rgba(65, 45, 253, 1) 48%, rgba(29, 29, 29, 1) 100%)",
      },
    },
  },
  plugins: [],
};
