import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// REPLACE 'estate-agent-app' WITH YOUR EXACT GITHUB REPOSITORY NAME
export default defineConfig({
    plugins: [react()],
    base: '/estate-agent-app/',
})