import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f0ff",
          magenta: "#ff006e",
          green: "#39ff14",
        },
        onepiece: {
          red: "#C8102E", // Straw Hat red
          blue: "#1E3A8A", // Ocean blue
          gold: "#FFD700", // Treasure gold
          brown: "#8B4513", // Wood/ship brown
          white: "#FFFFFF", // Jolly Roger white
          black: "#000000", // Jolly Roger black
          sky: "#87CEEB", // Sky blue
          ocean: "#006994", // Deep ocean
        },
        cartoon: {
          orange: "#FF6B35",
          yellow: "#FFD93D",
          green: "#6BCB77",
          blue: "#4ECDC4",
          pink: "#FF6B9D",
          purple: "#C44569",
        },
        dark: {
          bg: "#0a0e27",
          surface: "#1a1f3a",
        },
        light: {
          bg: "#FEF9E7",
          surface: "#FFF8DC",
          cream: "#FFF5E1",
        },
        text: {
          light: "#e0e0e0",
          white: "#ffffff",
          dark: "#2C3E50",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        mono: ["Monaco", "Courier New", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "bounce-soft": "bounce-soft 0.6s ease-in-out",
        "wiggle": "wiggle 0.5s ease-in-out",
        "float": "float 3s ease-in-out infinite",
        "blink": "blink 2s step-end infinite",
        "breathe": "breathe 3s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "blink": {
          "0%, 90%, 100%": { opacity: "1" },
          "95%": { opacity: "0" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

