import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "slot-machine": {
          "0%": {
            transform: "translateY(-90%)",
            filter: "blur(1px)",
          },
          "100%": {
            transform: "translateY(1%)",
            filter: "blur(1px)",
          },
        },
        "slot-machine-border": {
          "25%": {
            transform: "translateY(7%)",
          },
          "50%": {
            transform: "translateY(-3%)",
          },
          "70%": {
            transform: "translateY(4%)",
          },
          "85%": {
            transform: "translateY(-1%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "slot-machine-num": {
          "0%": {
            transform:
              "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y)))",
            filter: "none",
          },
          "25%": {
            transform:
              "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y) + 3%))",
          },
          "50% ": {
            transform:
              "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y) - 1%))",
          },
          "70%": {
            transform:
              "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y) + 0.6%))",
          },
          "85%": {
            transform:
              "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y) - 0.3%))",
          },
          "100%": {
            transform:
              "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y)))",
            filter: "none",
          },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
