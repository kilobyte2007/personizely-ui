// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { type Theme, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '@/assets/index.css'
import FrameDefaultLayout from '../components/FrameDefaultLayout.vue'
import Example from '../components/Example.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const route = useRoute()
    return h(route.path.startsWith('/frames/default') ? FrameDefaultLayout : DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp ({ app, router, siteData }) {
    app.component('Example', Example)
  }
} satisfies Theme
