/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#0f172a",      // dark slate
          accent: "#5eead4",  // teal
          text: "#e2e8f0",    // light gray
          muted: "#94a3b8",   // slate-400 aprox
          card: "rgba(148, 163, 184, 0.08)",
          border: "rgba(148, 163, 184, 0.18)",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
