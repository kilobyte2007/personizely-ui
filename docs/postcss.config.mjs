import { postcssIsolateStyles } from 'vitepress'
import tailwind from 'tailwindcss'

export default {
  plugins: [postcssIsolateStyles({
    includeFiles: [/vp-doc\.css/, /base\.css/]
  }), tailwind()]
}
