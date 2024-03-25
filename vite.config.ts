import path from "path"
import react from "@vitejs/plugin-react"
import svgr from "@svgr/rollup"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})