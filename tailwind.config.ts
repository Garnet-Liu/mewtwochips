import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slot-machine": {
          "0%": {
            transform: "translateY(-90%)",
            filter: "blur(1px)"
          },
          "100%": {
            transform: "translateY(1%)",
            filter: "blur(1px)"
          }
        },
        "slot-machine-border": {
          "25%": {
            transform: "translateY(7%)"
          },
          "50%": {
            transform: "translateY(-3%)"
          },
          "70%": {
            transform: "translateY(4%)"
          },
          "85%": {
            transform: "translateY(-1%)"
          },
          "100%": {
            transform: "translateY(0)"
          }
        },
        "slot-machine-num": {
          "0%": {
            transform: "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y)))",
            filter: "none"
          },
          "25%": {
            transform: "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y) + 3%))"
          },
          "50% ": {
            transform: "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y) - 1%))"
          },
          "70%": {
            transform: "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y) + 0.6%))"
          },
          "85% ": {
            transform: "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y) - 0.3%))"
          },
          "100%": {
            transform: "translateY(calc(var(--slot-machine-winner) * var(--slot-machine-translate-y)))",
            filter: "none"
          }
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
