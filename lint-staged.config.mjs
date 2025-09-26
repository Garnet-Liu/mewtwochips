export default {
    "*.{ts,tsx,js,jsx,md}": [() => "pnpm run lint"],
    "*.{ts,tsx}": [() => "pnpm run check-types"]
}