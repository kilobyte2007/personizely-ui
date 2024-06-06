import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

import options from './build/options'
import { fileURLToPath, URL } from 'url'


export default defineConfig(({ mode }) => {
  const outDir = options.paths.output.main

  return {
    plugins: [vue(), banner({ content: options.banner, outDir })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        vue: 'vue/dist/vue.esm-bundler.js'
      }
    },
    css: {
      postcss: {
        plugins: [autoprefixer(), tailwind()]
      }
    },
    build: {
      minify: mode === 'production' ? 'esbuild' : false,
      outDir,
      emptyOutDir: true,
      chunkSizeWarningLimit: 600,
      cssCodeSplit: false,
      lib: {
        entry: options.paths.resolve('src/index.ts'),
        name: 'PersonizelyUI',
        formats: ['umd', 'es'],
        fileName: options.name
      },
      rollupOptions: {
        external: [/^vue$/, 'vee-validate'],
        output: {
          globals: {
            vue: 'Vue',
            'vee-validate': 'veeValidate'
          },
          assetFileNames: assetInfo =>
            assetInfo.name?.endsWith('.css') ? `${options.name}.css` : assetInfo.name
        }
      }
    }
  }
})
