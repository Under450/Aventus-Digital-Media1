import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // Safe fallback so CI/build never fails if env vars are missing
  const apiKey = env.GEMINI_API_KEY ?? '';

  return {
    // IMPORTANT: GitHub Pages project site base
    base: '/Aventus-Digital-Media1/',

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});

