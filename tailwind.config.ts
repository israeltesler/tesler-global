import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        muted: "var(--color-text-muted)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
        dark: "var(--color-bg-dark)",
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-heebo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
