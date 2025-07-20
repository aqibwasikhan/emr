// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Primary */
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        'pri-background': 'var(--pri-background)',


        /* Secondary */
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        "secondary-200": "var(--secondary-200)",
        "secondary-300": "var(--secondary-300)",
        "secondary-400": "var(--secondary-400)",

        /* Muted */
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        /* Accent */
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        /* Destructive */
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",

        /* Border & Input */
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        /* Chart palette (optional) */
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",

        /* Sidebar */
        sidebar: "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",
      },
      backgroundImage: {
        /* Use your CSS variable for the gradient */
        "primary-gradient":
          "linear-gradient(135deg, #007A8B 0%, #3AAF4D 37.01%, #A8CB38 85.57%)",
      },
      fontSize: {
        "2xl": "26px", // You can use px, rem, or any other valid CSS unit
      },
    },
  },
  plugins: [],
};
