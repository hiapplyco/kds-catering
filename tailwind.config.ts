import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors — Light Brooklyn Comfort Palette (2026)
        orange: {
          DEFAULT: "#E67E22",
          50: "#FCF0E6",
          100: "#F9E1CC",
          200: "#F3C399",
          300: "#EDA566",
          400: "#E78733",
          500: "#E67E22",
          600: "#B8651B",
          700: "#8A4C14",
          800: "#5C330D",
          900: "#2E1907",
        },
        // Soft Persimmon — lighter, friendlier accent
        persimmon: {
          DEFAULT: "#F4A574",
          50: "#FEF6F0",
          100: "#FDEDE1",
          200: "#FBDBC3",
          300: "#F8C9A5",
          400: "#F4A574",
          500: "#F08C4F",
          600: "#E0712A",
          700: "#B85A22",
          800: "#90461A",
          900: "#683312",
        },
        brown: {
          DEFAULT: "#5D4037",
          50: "#F5F0EE",
          100: "#EBE1DD",
          200: "#D7C3BB",
          300: "#C3A599",
          400: "#AF8777",
          500: "#8B6B5D",
          600: "#5D4037",
          700: "#4A332C",
          800: "#372621",
          900: "#241916",
        },
        cream: {
          DEFAULT: "#FFF8E7",
          50: "#FFFFFF",
          100: "#FFF8E7",
          200: "#FFF1CF",
          300: "#FFEAB7",
          400: "#FFE39F",
          500: "#FFDC87",
        },
        // Chamomile — warm neutral for cards/backgrounds
        chamomile: {
          DEFAULT: "#FAF6F1",
          50: "#FFFFFF",
          100: "#FAF6F1",
          200: "#F5EDE3",
          300: "#EFE4D5",
          400: "#E9DBC7",
          500: "#E3D2B9",
        },
        // Oat — soft warm white
        oat: {
          DEFAULT: "#F9F7F4",
          50: "#FFFFFF",
          100: "#F9F7F4",
          200: "#F3EFE9",
          300: "#EDE7DE",
          400: "#E7DFD3",
          500: "#E1D7C8",
        },
        // Sage — fresh accent for "light" positioning
        sage: {
          DEFAULT: "#9CAF88",
          50: "#F4F6F2",
          100: "#E9EDE5",
          200: "#D3DBCB",
          300: "#BDC9B1",
          400: "#9CAF88",
          500: "#7F9A6A",
          600: "#657B54",
          700: "#4C5C3F",
          800: "#333D2A",
          900: "#1A1F15",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#FCF7E8",
          100: "#F9EFD1",
          200: "#F3DFA3",
          300: "#EDCF75",
          400: "#E7BF47",
          500: "#D4AF37",
          600: "#AA8C2C",
          700: "#7F6921",
          800: "#554616",
          900: "#2A230B",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        opensans: ["Open Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "url('/images/hero-pattern.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
