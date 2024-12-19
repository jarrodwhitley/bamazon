import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import NodePolyfills from 'vite-plugin-node-polyfills';

export default defineConfig({
    resolve: {
        alias: {
            buffer: 'buffer',
        },
    },
    define: {
        'process.env': {},
        global: 'globalThis',
    },
    plugins: [
        react(),
        NodePolyfills({
            protocolImports: true,
        }),],
    build: {
        outDir: 'build',
    },
})
