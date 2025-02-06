import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
    const postcssConfig = await import('./postcss.config.ts')

    return {
        plugins: [react()],
        css: {
            postcss: postcssConfig.default,
        },
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        server: {
            open: true,
        },
        build: {
            outDir: 'build',
            sourcemap: true,
        },
    }
})
