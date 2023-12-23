import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        // "slide-down": {
        //   from: {
        //     transform: "translate3d(0, var(calc(1px - (var(--stack-gap) * var(--index)))), 0)",
        //   },
        //   to: {
        //     transform: "translate3d(0, calc(var(--height,1000px)+16px), 0)",
        //   },
        // },
        "slide-right-in": {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding)))",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "slide-right-out": {
          from: {
            transform:
              "translate3d(var(--radix-toast-swipe-end-x, 0), calc(var(--hover-offset-y) - var(--stack-gap) * var(--index)), 0)",
          },
          to: {
            transform:
              "translate3d(calc(100% + var(--viewport-padding)), calc(var(--hover-offset-y) - var(--stack-gap) * var(--index)), 0)",
          },
        },
        // "slide-left": {
        //   from: {
        //     transform:
        //       "translate3d(var(--radix-toast-swipe-end-x), calc(1px - (var(--stack-gap) * var(--index))), 0)",
        //   },
        //   to: {
        //     transform: "translate3d(-100%, calc(1px - (var(--stack-gap) * var(--index))), 0)",
        //   },
        // },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
