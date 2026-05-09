import js from '../01_Lecture - react-refresher-1 [02-05-2026]/node_modules/@eslint/js/types'
import globals from '../01_Lecture - react-refresher-1 [02-05-2026]/node_modules/globals'
import reactHooks from '../01_Lecture - react-refresher-1 [02-05-2026]/node_modules/eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
