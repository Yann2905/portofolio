import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#0a0a0f",
          soft: "#111118",
          card: "#15151f",
        },
        brand: {
          DEFAULT: "#7c5cff",
          soft: "#a78bfa",
          glow: "#5b3df5",
        },
        accent: "#00e0c7",
      },
      boxShadow: {
        phone:
          "0 50px 100px -20px rgba(0,0,0,0.6), 0 30px 60px -30px rgba(124,92,255,0.35)",
        glow: "0 0 40px rgba(124,92,255,0.45)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at center, rgba(124,92,255,0.12), transparent 60%)",
      },
      animation: {
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
