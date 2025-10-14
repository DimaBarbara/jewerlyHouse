import type { Config } from "tailwindcss";

// tailwind.config.js

// tailwind.config.js

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        // Анимация для текста и кнопки (Задержка 300ms)
        "fade-in-300": "fadeIn 1s ease-out 0.3s forwards",

        // Анимация для 3D модели (Задержка 700ms)
        "slide-in-right-700": "slideInRight 1s ease-out 0.7s forwards",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ["Playfair Display SC", "serif"],
        brygada: ["Brygada 1918", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
