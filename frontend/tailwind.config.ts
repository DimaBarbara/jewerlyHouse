import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
