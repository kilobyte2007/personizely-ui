import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'url'
import { whyframe } from '@whyframe/core'
import { whyframeVue } from '@whyframe/vue'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Personizely UI",
  description: "Personizely UI - Beautiful set of components.",
  vite: {
    plugins: [
      whyframe({
        defaultSrc: '/frames/default'
      }),

      whyframeVue({
        include: /\.(?:vue|md)$/,
        parserOptions: {

        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Accordion', link: '/components/accordion' },
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Alert', link: '/components/alert' },
          { text: 'Alert dialog', link: '/components/alert-dialog' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'Button', link: '/components/button' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Checkbox group', link: '/components/checkbox-group' },
          { text: 'Date picker', link: '/components/date-picker' },
          { text: 'Date range picker', link: '/components/date-range-picker' },
          { text: 'Dialog', link: '/components/dialog' },
          { text: 'Dropdown menu', link: '/components/dropdown-menu' },
          { text: 'Input', link: '/components/input' },
          { text: 'Icon', link: '/components/icon' },
          { text: 'Popover', link: '/components/popover' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Progress circular', link: '/components/progress-circular' },
          { text: 'Radio group', link: '/components/radio-group' },
          { text: 'Select - WIP', link: '/components/select' },
          { text: 'Slider', link: '/components/slider' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Tabs - WIP', link: '/components/tabs' },
          { text: 'Textarea', link: '/components/textarea' },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Tooltip', link: '/components/tooltip' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
