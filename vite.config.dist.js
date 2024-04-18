import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

import options from './build/options'
import { fileURLToPath, URL } from 'url'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  const outDir = options.paths.output.main

  const formatFileNames = {
    es: {
      development: 'personizely-ui.esm.js',
      production: 'personizely-ui.esm.min.js'
    },
    umd: {
      development: 'personizely-ui.js',
      production: 'personizely-ui.min.js'
    }
  }

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
      emptyOutDir: false,
      chunkSizeWarningLimit: 600,
      cssCodeSplit: false,
      lib: {
        entry: options.paths.resolve('src/index.js'),
        name: 'PersonizelyUI',
        formats: isProduction ? ['umd'] : ['umd', 'es'],
        fileName: (format) => {
          return formatFileNames[format][mode]
        }
      },
      rollupOptions: {
        external: [/^vue/],
        output: {
          globals: {
            vue: 'Vue'
          },
          assetFileNames: assetInfo =>
            assetInfo.name === 'style.css' ? `keen-ui${isProduction ? '.min' : ''}.css` : assetInfo.name
        }
      }
    }
  }
})
