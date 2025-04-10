/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  safelist: [
    "w-[30%]",
    "w-[40%]",
    "w-[50%]",
    "w-[60%]",
    "w-[70%]",
    "w-[80%]",
    "w-[90%]",
    "ps-1",
    "ps-1",
    "ps-2",
    "ps-3",
    "ps-4",
    "ps-5",
    "ps-6",
    "ps-7",
    "ps-8",
    "ps-9",
    "ps-10",
    "ps-11",
    "ps-12",
    "ps-13",
    "ps-14",
    "ps-15",
    "ps-16",
    "col-span-2",
    "col-span-3",
  ],
  theme: {
    extend: {
      textShadow: {
        textShadow: "1px 1px 1px black",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        deals: "#008234",
        rating: "#003b95",
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
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        search: "#ffb700",
        searchGrayText: "#595959",
        buttonBlue: "#006ce4",
        guinesBlue: "#004cb8",
        navBarRoundedButton: "#868686",
        softBlue: "#f2f6fe",
        softGray: "#d9d9d9",
        softGrayBorder: "#e7e7e7",

        redError: "#d3111e",
        IconsGreen: "#008235",
        hoverBgSoftBlue: "#234e9e",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      screens: {
        xs: "300px",
        sm2: '550px',
        grid1: "550px",
        grid2: "800px",
        filtersPopup: "1024",
        1024: "1024",
        gr: "915px",
        search: "900px",
        TopHeader: "1022px",
        pro: "1010px", // progress
        pr: "785", // progress
        signInLayoutTop: "575px",
        foo: "600px", // footer
        tab: "975px",
      },
      boxShadow: {
        searchPopupsShadow: "0 2px 8px rgba(26, 26, 26, 0.34)",
        cardShadow: "0px 2px 8px 0px rgba(26, 26, 26, .16)",
        cardShadowTwo: "0px 2px 16px 0px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // important: true,
};
