/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "480px",
        xxs: "380px",
      },
      colors: {
        link: "var(--link-color)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        disabled: "hsl(var(--disabled))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          blue: "rgb(var(--primary-blue))",
          gray: "rgb(var(--primary-gray))",
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
          1: "var(--accent-1)",
          2: "var(--accent-2)",
          3: "var(--accent-3)",
          4: "var(--accent-4)",
          5: "var(--accent-5)",
          6: "var(--accent-6)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Gradients
        "blue-start": "var(--blue-start-color)",
        "blue-end": "var(--blue-end-color)",
        "purple-start": "var(--purple-start-color)",
        "purple-end": "var(--purple-end-color)",
        "orange-start": "var(--orange-start-color)",
        "orange-end": "var(--orange-end-color)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "dark-overlay":
          "linear-gradient(to bottom, transparent, rgba(0,0,0,.7) 50%, #000 75%, #000)",
        "border-gradient":
          "linear-gradient(to right, hsl(var(--background)) 0%, var(--accent-2) 10%, var(--accent-2) 90%, hsl(var(--background)) 100%)",
        "preview-flash":
          "radial-gradient(50% 50% at 50% 0, hsl(var(--foreground)/.5) 0%, hsl(var(--foreground)/.0) 100%)",
        "pricing-flash":
          "radial-gradient(circle at center, hsl(var(--foreground)/.5) 0%, hsl(var(--foreground)/.0) 100%)",
      },
      gridTemplateColumns: {
        // Complex table column configuration
        table: "36px minmax(144px, 1fr) 144px 36px",
      },
      boxShadow: {
        "nav-border": "inset 0 -1px 0 0 hsl(var(--border))",
        "themed-border": "0 0 0 1px hsl(var(--border))",
        "menu-border":
          "var(--border),0px 1px 1px rgba(0,0,0,.02),0px 4px 8px -4px rgba(0,0,0,.04),0px 16px 24px -8px rgba(0,0,0,.06)",
        "bottom-border": "0 3px 0 hsl(var(--foreground))",
      },
      width: {
        "content-page": "var(--content-page-width)",
        "content-page-with-margin": "var(--content-page-width-with-margin)",
        page: "var(--page-width)",
        "page-with-margin": "var(--page-width-with-margin)",
      },
      maxWidth: {
        "content-page": "var(--content-page-width)",
        "content-page-with-margin": "var(--content-page-width-with-margin)",
        page: "var(--page-width)",
        "page-with-margin": "var(--page-width-with-margin)",
      },
      padding: {
        "page-margin": "var(--page-margin)",
      },
      margin: {
        "page-margin": "var(--page-margin)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
