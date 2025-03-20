import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    // Aumenta o limite de tamanho de chunk para evitar o aviso
    chunkSizeWarningLimit: 1000, // Aumente esse valor para 1MB (por exemplo)

    // Exemplo de uso de manualChunks para dividir dependências
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Divida as dependências de node_modules em um arquivo separado
          }
        }
      }
    }
  }
})
