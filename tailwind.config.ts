import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',  // Custom extra small breakpoint
        'sm': '640px',  // Small screens (tablets)
        'md': '768px',  // Medium screens (tablets and small laptops)
        'lg': '1024px', // Large screens (laptops)
        'xl': '1280px', // Extra large screens (desktops)
        '2xl': '1536px', // Very large screens (large desktops)
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'hook': "url('/assets/hooks.svg')",
        'hero': "url('/assets/hero.svg')",
        'input': "url('/assets/hero/input.svg')",
        'paper': "url('/assets/hero/paper.png')",
      }
    },
  },
  plugins: [],
} satisfies Config;
