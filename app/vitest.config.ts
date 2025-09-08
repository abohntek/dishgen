import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // Global config common to all projects
  test: {
    globals: true,
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  // Use separate projects for node and jsdom tests
  projects: [
    defineConfig({
      test: {
        name: 'node',
        environment: 'node',
        include: ['__tests__/**/*.test.ts', '!**/*.dom.test.ts'],
      },
    }),
    defineConfig({
      test: {
        name: 'dom',
        environment: 'jsdom',
        include: ['__tests__/**/*.dom.test.ts'],
        setupFiles: ['__tests__/setup.dom.ts'],
      },
    }),
  ],
})