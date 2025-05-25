import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcsspxtorem from 'postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcsspxtorem({
          rootValue: 37.5,
          propList: ['*'],
          selectorBlackList: ['.norem'],
          exclude: /node_modules/i,
          replace: true,
          mediaQuery: false,
          minPixelValue: 1,
          unitPrecision: 5
        })
      ]
    }
  }
})
