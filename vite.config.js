import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

---

## 📄 **4. .env.production (NUEVO)**

**📁 Ubicación:** `~/proyectos_flask/Pandora/frontend/.env.production`

Es decir, en la **raíz del frontend**, al mismo nivel que `package.json`:
```
frontend/
├── .env.production          ← AQUÍ
├── package.json
├── vite.config.js
├── index.html
└── src/