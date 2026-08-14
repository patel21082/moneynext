import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080D17",
          900: "#0B1220",
          800: "#111A2C",
          700: "#1B2740",
          600: "#2A3A5C",
        },
        paper: {
          50: "#FBFBF9",
          100: "#F4F5F2",
          200: "#E8EAE4",
        },
        signal: {
          DEFAULT: "#4F63D2",
          light: "#7C8CE8",
          dim: "#3B4CAE",
        },
        gain: {
          DEFAULT: "#1FA971",
          soft: "#E4F5EC",
        },
        warn: {
          DEFAULT: "#C8801A",
          soft: "#FBF0DE",
        },
        danger: {
          DEFAULT: "#C4432E",
          soft: "#FBE9E5",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drawCircle: {
          "0%": { strokeDashoffset: "var(--circle-start)" },
          "100%": { strokeDashoffset: "var(--circle-end)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        fadeIn: "fadeIn 0.5s ease forwards",
        drawCircle: "drawCircle 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
