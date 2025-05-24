// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#3B82F6", // blue-500
          secondary: "#10B981", // emerald-500 
          background: "#F9FAFB", // gray-50
          danger: "#EF4444", // red-500
        },
      },
    },
    plugins: [],
  };