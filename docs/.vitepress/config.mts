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

    outline: {
      level: [2, 3],
    },

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
          { text: 'Card', link: '/components/card' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Checkbox group', link: '/components/checkbox-group' },
          { text: 'Color picker - WIP', link: '/components/color-picker' },
          { text: 'Combobox - WIP', link: '/components/combobox' },
          { text: 'Date picker', link: '/components/date-picker' },
          { text: 'Date range picker', link: '/components/date-range-picker' },
          { text: 'Dialog', link: '/components/dialog' },
          { text: 'Drawer', link: '/components/drawer' },
          { text: 'Dropdown menu', link: '/components/dropdown-menu' },
          { text: 'Input', link: '/components/input' },
          { text: 'Icon', link: '/components/icon' },
          { text: 'Fieldset - WIP', link: '/components/fieldset' },
          { text: 'Popover', link: '/components/popover' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Progress circular', link: '/components/progress-circular' },
          { text: 'Radio group', link: '/components/radio-group' },
          { text: 'Select - WIP', link: '/components/select' },
          { text: 'Slider', link: '/components/slider' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Tabs', link: '/components/tabs' },
          { text: 'Textarea', link: '/components/textarea' },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Toggle', link: '/components/toggle' },
          { text: 'Toggle group', link: '/components/toggle-group' },
          { text: 'Tooltip', link: '/components/tooltip' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
