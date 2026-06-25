import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { promises as fs } from 'fs'

import { cloudflare } from "@cloudflare/vite-plugin";

// Custom Vite server plugin to save translations directly to disk in local development
function translationApiPlugin() {
  return {
    name: 'translation-api-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === '/api/save-translations' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: any) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const { lang, data } = JSON.parse(body)
              if (lang === 'id' || lang === 'en') {
                const filePath = path.resolve(__dirname, `./src/i18n/locales/${lang}.json`)
                await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: true, message: `Saved ${lang}.json successfully` }))
              } else {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: false, message: 'Invalid language' }))
              }
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, message: err.message }))
            }
          })
        } else if (req.url === '/api/contact' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: any) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              console.log('Received local contact inquiry (Vite mock backend):', data)
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: true, message: 'Local mock submit success' }))
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, message: err.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), translationApiPlugin(), cloudflare()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('i18next')) return 'vendor-i18n';
            return 'vendor-core';
          }
        }
      }
    }
  }
})