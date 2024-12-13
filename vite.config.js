import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Datadynamo/',
  define: {
    'process.env.VITE_SUPABASE_KEY': JSON.stringify(process.env.VITE_SUPABASE_KEY),
    'process.env.VITE_SENDGRID_API_KEY': JSON.stringify(process.env.VITE_SENDGRID_API_KEY),
    'process.env.VITE_STRIPE_SECRET_KEY': JSON.stringify(process.env.VITE_STRIPE_SECRET_KEY)
  }
});
