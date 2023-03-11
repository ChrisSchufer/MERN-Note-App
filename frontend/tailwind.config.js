/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        customError: "0 0 0px 1px #FD0000, 0 0 3px 5px #FF7A7A",
        custom: "0 0 0px 1px #7AE5E9, 0 0 3px 5px #7AE5E9",
      },
    },
  },
  plugins: [],
};
