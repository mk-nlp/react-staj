/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gray900: "#13131A",
        gray800: "#16161F",
        gray700: "#1C1C27",
        gray600: "#22222F",
        gray500: "#3B3B54",
        gray400: "#7F7F98",
        gray300: "#ABABC4",
        gray200: "#BFBFD4",
        gray100: "#FAFAFA",
        bluelight: "#8FB2F5",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'morning': "url('./assets/backgrounds/w1.svg')",
        'noon': "url('./assets/backgrounds/w2.svg')",
        'high-noon': "url('./assets/backgrounds/w3.svg')",
        'afternoon': "url('./assets/backgrounds/w4.svg')",
        'sunset': "url('./assets/backgrounds/w5.svg')",
        'evening': "url('./assets/backgrounds/w6.svg')",
        'evening-2': "url('./assets/backgrounds/w7.svg')",
        'evening-3': "url('./assets/backgrounds/w8.svg')",
        'night': "url('./assets/backgrounds/w9.svg')",
        'midnight': "url('./assets/backgrounds/w10.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-animate")],
}