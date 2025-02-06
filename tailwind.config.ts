import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'hook': "url('/assets/hooks.svg')",
        'hero': "url('/assets/hero.svg')",
        'input': "url('/assets/hero/input.svg')",
      }
    },
  },
  plugins: [],
} satisfies Config;
