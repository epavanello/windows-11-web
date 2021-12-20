import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'

import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), WindiCSS()],
  resolve: {
    alias: {
      $assets: path.resolve(path.dirname(''), './src/assets'),
      $components: path.resolve(path.dirname(''), './src/components'),
      $containers: path.resolve(path.dirname(''), './src/containers'),
      $lib: path.resolve(path.dirname(''), './src/lib'),
      $styles: path.resolve(path.dirname(''), './src/styles')
    }
  }
})
