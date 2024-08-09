import { defineConfig } from 'vite'
import { Buffer } from 'buffer'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process': process,
    'Buffer': Buffer,
    'Buffer.isBuffer': Buffer.isBuffer
  }
})
