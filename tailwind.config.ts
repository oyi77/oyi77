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
        tan: "#f4e4bc", // Warmer Beige/Paper
        "retro-gray": "#1d1f25", // Dark text/border
        "retro-red": "#f54e00", // PostHog Orange-Red
        "retro-blue": "#357ded", // Bright animated blue
        "retro-yellow": "#f9c859", // Warm yellow
        "retro-white": "#ffffff",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(#9ca3af 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "20px 20px",
      },
      boxShadow: {
        // Hard shadows (no blur)
        "brutal": "3px 3px 0px 0px rgba(0,0,0,1)",
        "brutal-lg": "5px 5px 0px 0px rgba(0,0,0,1)",
        "brutal-sm": "1px 1px 0px 0px rgba(0,0,0,1)",
        "brutal-hover": "5px 5px 0px 0px rgba(0,0,0,1)",
        "brutal-active": "1px 1px 0px 0px rgba(0,0,0,1)",
      },
      fontFamily: {
        mono: ["Monaco", "Courier New", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
      },
    },
  },
  plugins: [],
};
export default config;

