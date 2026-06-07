import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base defaults to '/'. Keep '/' for Vercel root hosting.
// build.outDir defaults to 'dist'.
export default defineConfig({
  plugins: [react()],
})
