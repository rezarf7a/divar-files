import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = [
  "src",
  "components",
  "configs",
  "pages",
  "services",
  "styles",
  "utils",
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...path.reduce( (acc, cur) => ({
        ...acc,
        [cur]: `${cur == "src" ? cur : "src/" + cur }`
      }), "")
    }
  }
})
