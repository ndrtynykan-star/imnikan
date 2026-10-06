import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    // The preview is served through a proxy on an environment-specific host, so
    // allow every host/origin rather than an exact allowlist entry.
    allowedHosts: true,
    watch: {
      // Bind mounts rarely propagate inotify events; poll instead.
      usePolling: true,
      interval: 250,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
