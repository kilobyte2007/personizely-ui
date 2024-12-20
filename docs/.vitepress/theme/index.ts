// https://vitepress.dev/guide/custom-theme
import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './index.css'
import './style.css'
import Example from '../components/Example.vue'

export default {
  extends: DefaultTheme,
  Layout: DefaultTheme.Layout,
  enhanceApp ({ app }) {
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Example', Example)

    if (typeof window !== 'undefined') {
      const portalDiv = document.createElement('div')
      portalDiv.id = 'portal'
      portalDiv.classList.add('vp-raw')
      document.body.appendChild(portalDiv)
    }
  }
} satisfies Theme
