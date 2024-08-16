import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        alias: {
            '../../src': new URL('./src/', import.meta.url).pathname,
        },
        // coverage: {
        //     provider: 'istanbul',
        //     reporter: ['text', 'text-summary', 'lcovonly'],
        //     reportsDirectory: './coverage'
        // },
        globals: true,
        // environment: 'happy-dom',
        setupFiles: ['./vitest.setup.ts'],
    }
})