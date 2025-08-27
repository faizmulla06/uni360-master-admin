/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef7ed",
          100: "#fdedd4",
          200: "#fad8a8",
          300: "#f7be71",
          400: "#f29c38",
          500: "#e08d3c", // Tiger Eye
          600: "#d16d1c",
          700: "#ae5317",
          800: "#8c4219",
          900: "#723718",
        },
        secondary: {
          50: "#f6f7f8",
          100: "#edeef0",
          200: "#d6d9de",
          300: "#b3bac3",
          400: "#8a96a3",
          500: "#6b7888",
          600: "#596371",
          700: "#49515c",
          800: "#3f454e",
          900: "#2a3439", // Gunmetal
        },
        accent: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#c4d8e2", // Columbia Blue
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "bounce-in": "bounceIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
